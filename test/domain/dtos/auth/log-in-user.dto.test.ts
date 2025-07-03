import { LogInUserDto } from "../../../../src/domain/dtos/auth";

describe("LogInUserDto", () => {
	it("should create a new user", () => {
		const data = {
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
		};
		const [error, user] = LogInUserDto.create(data);

		expect(error).toBeUndefined();
		expect(user).toBeInstanceOf(LogInUserDto);

		expect(user?.email).toBe(data.email);
		expect(user?.password).toBe(data.password);
	});

	it("should not create a new user with object", () => {
		const [error, user] = LogInUserDto.create(undefined);

		expect(error).toEqual("Object is required");
		expect(user).toBeUndefined();
	});

	//* Email
	it("should not create a new user with email", () => {
		const data = {
			email: null,
			password: "Algo*1607",
		};
		const [error, user] = LogInUserDto.create(data);

		expect(error).toEqual("Email is required");
		expect(user).toBeUndefined();
	});

	it("should not create a new user with error email", () => {
		const data = {
			email: "luisjoaquinvgmail.com",
			password: "Algo*1607",
		};
		const [error, user] = LogInUserDto.create(data);

		expect(error).toEqual("Email format is invalid");
		expect(user).toBeUndefined();
	});

	//* Password
	it("should not create a new user with password", () => {
		const data = {
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: null,
		};
		const [error, user] = LogInUserDto.create(data);

		expect(error).toEqual("Password is required");
		expect(user).toBeUndefined();
	});
	it("should not create a new user with error password", () => {
		const data = {
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*16",
		};
		const [error, user] = LogInUserDto.create(data);

		expect(error).toEqual("Password must be at least 8 characters long");
		expect(user).toBeUndefined();
	});
	it("should not create a new user with error password", () => {
		const data = {
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607Algo*1607Algo*1607Algo*1607",
		};
		const [error, user] = LogInUserDto.create(data);

		expect(error).toEqual("Password must be less than 32 characters long");
		expect(user).toBeUndefined();
	});
});
