import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { MongoDatabase } from "./data";

const main = () => {
	MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	const server = new Server({ port: envs.PORT, routes: AppRoutes.routes() });
	server.start();
};

(() => {
	main();
})();
