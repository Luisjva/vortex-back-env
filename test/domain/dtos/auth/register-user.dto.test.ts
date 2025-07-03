import { RegisterUserDto } from "../../../../src/domain";

describe("RegisterUserDto", () => {
	it("should dont add an object", () => {
		const [error, user] = RegisterUserDto.create();
		expect(error).toEqual("Object is required");
		expect(user).toBeUndefined();
	});

	it("should create a new user", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toBeUndefined();
		expect(user).toBeInstanceOf(RegisterUserDto);

		expect(user?.name).toBe(data.name);
		expect(user?.email).toBe(data.email);
		expect(user?.password).toBe(data.password);
		expect(user?.nickname).toBeUndefined();
		expect(user?.avatar).toBeUndefined();
		expect(user?.description).toBeUndefined();
	});

	it("should create a new user without email", () => {
		const data = {
			name: "Luis Joaquín",
			email: null,
			password: "Algo*1607",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Email is required");
		expect(user).toBeUndefined();
	});

	it("should create a new user with error email", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvgmail.com",
			password: "Algo*1607",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Email format is invalid");
		expect(user).toBeUndefined();
	});

	it("should create a new user with nickname", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			nickname: "LuisJoaquin",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toBeUndefined();
		expect(user).toBeInstanceOf(RegisterUserDto);

		expect(user?.name).toBe(data.name);
		expect(user?.email).toBe(data.email);
		expect(user?.password).toBe(data.password);
		expect(user?.nickname).toBe(data.nickname.toLowerCase().trim());
		expect(user?.avatar).toBeUndefined();
		expect(user?.description).toBeUndefined();
	});

	it("should create a new user with avatar", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			avatar: "https://example.com/avatar.jpg",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toBeUndefined();
		expect(user).toBeInstanceOf(RegisterUserDto);

		expect(user?.name).toBe(data.name);
		expect(user?.email).toBe(data.email);
		expect(user?.password).toBe(data.password);
		expect(user?.nickname).toBeUndefined();
		expect(user?.avatar).toBe(data.avatar);
		expect(user?.description).toBeUndefined();
	});

	it("should create a new user with description", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			description:
				"Luis Joaquín es un desarrollador de software con experiencia en el desarrollo de aplicaciones web.",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toBeUndefined();
		expect(user).toBeInstanceOf(RegisterUserDto);

		expect(user?.name).toBe(data.name);
		expect(user?.email).toBe(data.email);
		expect(user?.password).toBe(data.password);
		expect(user?.nickname).toBeUndefined();
		expect(user?.avatar).toBeUndefined();
		expect(user?.description).toBe(data.description);
	});

	it("should create a new user with nickname, avatar and description", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			nickname: "LuisJoaquin",
			avatar: "https://example.com/avatar.jpg",
			description:
				"Luis Joaquín es un desarrollador de software con experiencia en el desarrollo de aplicaciones web.",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toBeUndefined();
		expect(user).toBeInstanceOf(RegisterUserDto);

		expect(user?.name).toBe(data.name);
		expect(user?.email).toBe(data.email);
		expect(user?.password).toBe(data.password);
		expect(user?.nickname).toBe(data.nickname.toLowerCase().trim());
		expect(user?.avatar).toBe(data.avatar);
		expect(user?.description).toBe(data.description);
	});

	it("should not create a new user with name", () => {
		const data = {
			name: null,
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Name is required");
		expect(user).toBeUndefined();
	});

	it("should not create a new user with nickname with spaces", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			nickname: "Luis Joaquín",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Nickname must not contain spaces");
		expect(user).toBeUndefined();
	});

	it("should not create a new user with nickname with more than 16 characters", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			nickname: "LuisJoaquinLuisJoaquinLuisJoaquin",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Nickname must be less than 16 characters long");
		expect(user).toBeUndefined();
	});

	it("should create a new user with description with less than 100 characters", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			description:
				"Luis Joaquín es un desarrollador de software con experiencia en el desarrollo de aplicaciones web para ver si es muy largo esto.",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Description must be less than 100 characters long");
		expect(user).toBeUndefined();
	});

	//* Password
	it("should not create a new user with password", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: null,
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Password is required");
		expect(user).toBeUndefined();
	});

	it("should not create a new user with password with less than 8 characters", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*16",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Password must be at least 8 characters long");
		expect(user).toBeUndefined();
	});

	it("should not create a new user with password with more than 32 characters", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607Algo*1607Algo*1607Algo*1607",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Password must be less than 32 characters long");
		expect(user).toBeUndefined();
	});

	it("should not create a new user with password with spaces", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607 Algo*1607",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Password must not contain spaces");
		expect(user).toBeUndefined();
	});

	it("should not create a new user with password without uppercase letter", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "algo*1607",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual(
			"Password must contain at least one uppercase letter"
		);
		expect(user).toBeUndefined();
	});

	it("should not create a new user with password without lowercase letter", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "ALGO*1607",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual(
			"Password must contain at least one lowercase letter"
		);
		expect(user).toBeUndefined();
	});

	it("should not create a new user with password without number", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*Algo*",
			methodsOfLogin: ["email"],
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual("Password must contain at least one number");
		expect(user).toBeUndefined();
	});

	it("should not create a new user with password without special character", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo1607Algo1607",
		};
		const [error, user] = RegisterUserDto.create(data);

		expect(error).toEqual(
			"Password must contain at least one special character"
		);
		expect(user).toBeUndefined();
	});
});
