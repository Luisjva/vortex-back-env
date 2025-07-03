import { emailRegex } from "../../config";

export enum MethodOfLogin {
	EMAIL = "email",
	GOOGLE = "google",
}

export class UserEntity {
	constructor(
		public name: string,
		public email: string,
		public password: string,

		public id: string,
		public emailVerified: boolean,
		public role: string[],
		public createdAt: Date,
		public updatedAt: Date,

		public methodsOfLogin: MethodOfLogin[],

		public nickname?: string,
		public avatar?: string,
		public description?: string
	) {}

	static toObject(data?: any) {
		if (!data) throw new Error("Object is required");
		const {
			name,
			email,
			id,
			_id,
			emailVerified,
			password,
			role,
			createdAt,
			updatedAt,
			methodsOfLogin,
			nickname,
			avatar,
			description,
		} = data;

		if (!id && !_id) {
			throw new Error("Id is required");
		}

		if (!email) {
			throw new Error("Email is required");
		} else if (!emailRegex.test(email.trim())) {
			throw new Error("Email is invalid");
		}

		if (!password) {
			throw new Error("Password is required");
		}

		if (!role) {
			throw new Error("Role is required");
		}

		if (!createdAt) {
			throw new Error("CreatedAt is required");
		}

		if (!updatedAt) {
			throw new Error("UpdatedAt is required");
		}

		if (!methodsOfLogin) {
			throw new Error("MethodsOfLogin is required");
		} else if (!Array.isArray(methodsOfLogin) || methodsOfLogin.length === 0) {
			throw new Error("MethodsOfLogin must be an array");
		} else {
			methodsOfLogin.forEach((method) => {
				if (!Object.values(MethodOfLogin).includes(method)) {
					throw new Error("MethodsOfLogin is invalid");
				}
			});
		}

		return new UserEntity(
			name,
			email,
			password,
			id || _id,
			emailVerified,
			role,
			createdAt,
			updatedAt,
			methodsOfLogin,
			nickname,
			avatar,
			description
		);
	}
}
