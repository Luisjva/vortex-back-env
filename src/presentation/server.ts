import express from "express";
import { Router } from "express";

interface ServerOptions {
	port: number;
	publicPath?: string;
	routes: Router;
}

export class Server {
	private app: express.Application;
	private serverListener?: any;
	private readonly port: number;
	private readonly publicPath: string;
	private readonly routes: Router;

	constructor(Options: ServerOptions) {
		this.app = express();
		this.port = Options.port;
		this.publicPath = Options.publicPath || "public";
		this.routes = Options.routes;
	}

	start() {
		//* Middlewares
		this.app.use(express.json()); // raw
		this.app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded

		//* Public routes
		this.app.use(express.static(this.publicPath));

		//* Routes
		this.app.use(this.routes);

		//TODO: 404

		//* Listen
		this.serverListener = this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}
