import { bcryptAdapter } from "../../config";
import { jwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data";
import {
	CustomError,
	MethodOfLogin,
	RegisterUserDto,
	UserEntity,
} from "../../domain";
import { LogInUserDto } from "../../domain/dtos/auth";

type userWithoutPassword = Omit<UserEntity, "password">;

type Auth = {
	token: string;
	refreshToken: string;
};

export class AuthService {
	constructor() {}

	private generateToken(tokenData: { id: string; email: string }): Auth {
		const token = jwtAdapter.generateToken(tokenData);
		const refreshToken = jwtAdapter.generateToken(
			{ ...tokenData, refreshToken: true },
			"180d"
		);

		return { token, refreshToken };
	}

	public async register(registerUserDto: RegisterUserDto): Promise<
		| {
				user: userWithoutPassword;
				auth: Auth;
		  }
		| CustomError
	> {
		try {
			const res = Promise.all([
				UserModel.findOne({ email: registerUserDto.email }), // Check if email exists
				UserModel.findOne({ nickname: registerUserDto.nickname }), // Check if nickname exists
			]);

			const [userExists, nicknameExists] = await res;

			if (userExists) {
				return CustomError.badRequest("Email already exists");
			}

			if (nicknameExists) {
				return CustomError.badRequest("Nickname already exists");
			}

			registerUserDto.password = await bcryptAdapter.hash(
				registerUserDto.password
			);

			const user = await UserModel.create(registerUserDto);
			const { password, ...rest } = UserEntity.toObject(user);

			const { token, refreshToken } = this.generateToken({
				id: rest.id,
				email: rest.email,
			});

			return {
				user: rest,
				auth: {
					token,
					refreshToken,
				},
			};
		} catch (error: unknown) {
			console.log("auth service error", error);
			return CustomError.internalServer("Internal server error");
		}
	}

	public async login(
		logInUser: LogInUserDto
	): Promise<{ user: userWithoutPassword; auth: Auth } | CustomError> {
		try {
			const user = await UserModel.findOne({ email: logInUser.email });

			if (!user) {
				return CustomError.badRequest("User or password are incorrect");
			}

			if (!user.methodsOfLogin.includes(MethodOfLogin.EMAIL)) {
				return CustomError.badRequest("User or password are incorrect");
			}

			const isPasswordValid = await bcryptAdapter.compare(
				logInUser.password,
				user.password
			);

			if (!isPasswordValid) {
				return CustomError.badRequest("User or password are incorrect");
			}

			const { password, ...rest } = UserEntity.toObject(user);

			const tokenData = {
				id: rest.id,
				email: rest.email,
			};

			const { token, refreshToken } = this.generateToken(tokenData);

			return { user: rest, auth: { token, refreshToken } };
		} catch (error: unknown) {
			console.log("auth service error", error);
			return CustomError.internalServer("Internal server error");
		}
	}

	public async verifyEmail(
		token: string
	): Promise<{ user: userWithoutPassword } | CustomError> {
		try {
			const decoded = jwtAdapter.verifyToken(token);
			if (typeof decoded === "string") {
				return CustomError.unauthorized("Invalid token");
			}
			const user = await UserModel.findById(decoded.id);
			if (!user) {
				return CustomError.unauthorized("User not found");
			}
			user.emailVerified = true;
			await user.save();
			const { password, ...rest } = UserEntity.toObject(user);
			return { user: rest };
		} catch (error: unknown) {
			console.log("auth service error", error);
			return CustomError.unauthorized("Invalid token");
		}
	}

	public async refreshToken(
		refreshToken: string
	): Promise<{ user: userWithoutPassword; auth: Auth } | CustomError> {
		try {
			const decoded = jwtAdapter.verifyToken(refreshToken);

			if (typeof decoded === "string") {
				return CustomError.unauthorized("Invalid token");
			}

			const user = await UserModel.findById(decoded.id);
			if (!user) {
				return CustomError.unauthorized("User not found");
			}

			const { password, ...rest } = UserEntity.toObject(user);
			const authTokens = this.generateToken({
				id: rest.id,
				email: rest.email,
			});
			return { user: rest, auth: authTokens };
		} catch (error: unknown) {
			if (error instanceof CustomError) {
				return error;
			}

			if (error instanceof Error) {
				if (error.message === "jwt malformed") {
					return CustomError.unauthorized("Invalid token");
				}
				return CustomError.unauthorized(error.message);
			}

			return CustomError.unauthorized("Invalid token");
		}
	}
}
