import { Router } from "express";
import AuthRouter from "./auth/router";

export class AppRoutes {
	static routes(): Router {
		const router = Router();

		router.use("/api/auth", AuthRouter.routes());

		return router;
	}
}
