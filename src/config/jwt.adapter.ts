import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SECRET = envs.JWT_SECRET;

export const jwtAdapter = {
	generateToken(payload: any, expiresIn: string = envs.JWT_EXPIRES_IN): string {
		const options = {
			expiresIn: expiresIn,
		} as SignOptions;

		return jwt.sign(payload, JWT_SECRET, options);
	},

	verifyToken(token: string): string | JwtPayload {
		try {
			return jwt.verify(token, JWT_SECRET);
		} catch (error) {
			return "Invalid token";
		}
	},
};
