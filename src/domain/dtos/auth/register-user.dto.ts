import { emailRegex } from "../../../config";
import { MethodOfLogin } from "../../entity/user.entity";

export class RegisterUserDto {
	constructor(
		public name: string,
		public email: string,
		public password: string,
		public methodsOfLogin: MethodOfLogin[],

		public nickname?: string,
		public avatar?: string,
		public description?: string
	) {}

	static create(object?: { [key: string]: any }): [string?, RegisterUserDto?] {
		if (!object) return ["Object is required"];
		let {
			name,
			email,
			password,
			nickname,
			avatar,
			description,
			methodsOfLogin,
		} = object;

		//* Name
		if (!name) return ["Name is required"];

		//* Email
		if (!email) return ["Email is required"];
		if (!emailRegex.test(email.trim())) return ["Email format is invalid"];

		//* Password
		if (!password) return ["Password is required"];
		if (password.length < 8)
			return ["Password must be at least 8 characters long"];
		if (password.length > 32)
			return ["Password must be less than 32 characters long"];
		if (password.includes(" ")) return ["Password must not contain spaces"];
		if (!/[A-Z]/.test(password))
			return ["Password must contain at least one uppercase letter"];
		if (!/[a-z]/.test(password))
			return ["Password must contain at least one lowercase letter"];
		if (!/[0-9]/.test(password))
			return ["Password must contain at least one number"];
		if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
			return ["Password must contain at least one special character"];

		//* Nickname
		if (nickname) {
			if (nickname.includes(" ")) {
				return ["Nickname must not contain spaces"];
			} else if (nickname.length > 16) {
				return ["Nickname must be less than 16 characters long"];
			} else {
				nickname = nickname.toLowerCase().trim();
			}
		}

		//* Avatar
		// if (
		// 	avatar &&
		// 	!avatar.startsWith("http://") &&
		// 	!avatar.startsWith("https://")
		// )
		// 	return ["Avatar must be a valid URL"];

		//* Description
		if (description && description.length > 100)
			return ["Description must be less than 100 characters long"];

		//* Methods of login
		if (!methodsOfLogin) return ["Methods of login is required"];
		if (!Array.isArray(methodsOfLogin) || methodsOfLogin.length === 0)
			return ["Methods of login must be an array"];
		methodsOfLogin.forEach((method) => {
			if (!Object.values(MethodOfLogin).includes(method)) {
				return ["Methods of login is invalid"];
			}
		});

		return [
			undefined,
			new RegisterUserDto(
				name,
				email,
				password,
				methodsOfLogin,
				nickname,
				avatar,
				description
			),
		];
	}
}
