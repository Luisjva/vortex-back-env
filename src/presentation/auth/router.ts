import { Request, Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services";
import { AuthMiddleware } from "../middelwares/auth.middelware";

export default class AuthRouter {
	static routes(): Router {
		const router = Router();
		const authController = new AuthController(new AuthService());

		router.post("/register", AuthMiddleware.verityPublicToken, (req, res) =>
			authController.register(req, res)
		);

		router.post("/login", AuthMiddleware.verityPublicToken, (req, res) =>
			authController.login(req, res)
		);

		router.post("/verify-email", AuthMiddleware.verityToken, (req, res) =>
			authController.verifyEmail(req, res)
		);

		router.post("/refresh-token", AuthMiddleware.verityToken, (req, res) =>
			authController.refreshToken(req, res)
		);

		return router;
	}
}
