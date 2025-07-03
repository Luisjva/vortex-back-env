import { NextFunction, Request, Response } from "express";
import { envs } from "../../config";
import { jwtAdapter } from "../../config/jwt.adapter";

export class AuthMiddleware {
	static verityPublicToken(req: Request, res: Response, next: NextFunction) {
		try {
			let reqToken = req?.headers?.authorization;
			if (!reqToken) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			let token = reqToken.split(" ")[1];

			if (token !== envs.PUBLIC_KEY) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			console.log(reqToken);
			next();
		} catch (error) {
			console.log("Auth Middleware Error", error);
			res.status(500).json({ error: "Internal server error" });
		}
	}

	static verityToken(
		req: Request<any, any, any>,
		res: Response,
		next: NextFunction
	) {
		try {
			const reqToken = req?.headers?.authorization;
			if (!reqToken) {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			const token = reqToken.split(" ")[1];

			const decoded = jwtAdapter.verifyToken(token);

			if (typeof decoded === "string") {
				res.status(401).json({ error: "Unauthorized" });
				return;
			}

			next();
		} catch (error) {
			console.log("Auth Middleware Error", error);
			res.status(500).json({ error: "Internal server error" });
		}
	}
}
