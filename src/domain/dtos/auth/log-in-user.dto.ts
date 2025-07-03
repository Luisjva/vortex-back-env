import { emailRegex } from "../../../config";

export class LogInUserDto {
	constructor(public email: string, public password: string) {}

	static create(object?: { [key: string]: any }): [string?, LogInUserDto?] {
		if (!object) return ["Object is required"];
		let { email, password } = object;

		//* Email
		if (!email) return ["Email is required"];
		if (!emailRegex.test(email.trim())) return ["Email format is invalid"];

		//* Password
		if (!password) return ["Password is required"];
		if (password.length < 8)
			return ["Password must be at least 8 characters long"];
		if (password.length > 32)
			return ["Password must be less than 32 characters long"];

		return [undefined, new LogInUserDto(email, password)];
	}
}
