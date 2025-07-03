import "dotenv/config";
import { get } from "env-var";

export const envs = {
	PORT: get("PORT").required().asPortNumber(),
	PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),

	NODE_ENV: get("NODE_ENV")
		.default("development")
		.asEnum(["development", "production", "test"]),

	MONGO_URL: get("MONGO_URL").required().asString(),
	MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),

	PUBLIC_KEY: get("PUBLIC_KEY").required().asString(),

	JWT_SECRET: get("JWT_SECRET").required().asString(),
	JWT_EXPIRES_IN: get("JWT_EXPIRES_IN").required().asString(),
};
