import mongoose from "mongoose";

interface Options {
	mongoUrl: string;
	dbName: string;
}

export class MongoDatabase {
	static connect(options: Options) {
		const { mongoUrl, dbName } = options;
		try {
			mongoose.connect(mongoUrl, {
				dbName,
			});
			return true;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static disconnect() {
		try {
			mongoose.disconnect();
			return true;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
