import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthService } from "../services/auth.service";
import { LogInUserDto, RegisterUserDto } from "../../domain/dtos/auth";
import { MethodOfLogin } from "../../domain";

export class AuthController {
	// ID
	constructor(private authService: AuthService) {}

	private handleError(error: unknown, res: Response) {
		if (error instanceof CustomError) {
			return res.status(error.code).json({ error: error.message });
		}
		console.log("Error", error);
		return res.status(500).json({ error: "Internal server error" });
	}

	register(req: Request, res: Response) {
		const [error, registerUserDto] = RegisterUserDto.create({
			...(req?.body || {}),
			methodsOfLogin: [MethodOfLogin.EMAIL],
		});

		if (error) {
			this.handleError(CustomError.badRequest(error), res);
			return;
		}

		this.authService
			.register(registerUserDto!)
			.then((user) => {
				if (user instanceof CustomError) {
					throw user;
				}
				res.status(201).json(user);
			})
			.catch((error) => {
				this.handleError(error, res);
			});
	}

	login(req: Request<any, any, any>, res: Response) {
		const [error, logInUserDto] = LogInUserDto.create(req?.body || {});

		if (error) {
			this.handleError(CustomError.badRequest(error), res);
			return;
		}

		this.authService
			.login(logInUserDto!)
			.then((user) => {
				if (user instanceof CustomError) {
					throw user;
				}
				res.status(200).json(user);
			})
			.catch((error) => {
				this.handleError(error, res);
			});
	}

	verifyEmail(req: Request<any, any, any>, res: Response) {
		const token = req?.body?.token;
		const authorization = req?.headers?.authorization;

		if (!token) {
			this.handleError(CustomError.badRequest("Token is required"), res);
			return;
		}
		if (authorization !== `Bearer ${token}`) {
			this.handleError(CustomError.unauthorized("Unauthorized"), res);
			return;
		}

		this.authService
			.verifyEmail(token)
			.then((user) => {
				if (user instanceof CustomError) {
					throw user;
				}
				res.status(200).json(user);
			})
			.catch((error) => {
				this.handleError(error, res);
			});
	}

	refreshToken(req: Request<any, any, any>, res: Response) {
		const refreshToken = req?.body?.refreshToken;

		if (!refreshToken) {
			this.handleError(
				CustomError.badRequest("Refresh token is required"),
				res
			);
			return;
		}

		this.authService
			.refreshToken(refreshToken)
			.then((user) => {
				if (user instanceof CustomError) {
					throw user;
				}
				res.status(200).json(user);
			})
			.catch((error) => {
				this.handleError(error, res);
			});
	}
}
