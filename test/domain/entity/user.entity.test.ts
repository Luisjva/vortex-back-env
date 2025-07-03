import { UserEntity } from "../../../src/domain";

describe("UserEntity", () => {
	it("should not create a new user", () => {
		try {
			UserEntity.toObject();
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Object is required");
		}
	});

	it("should create a new user", () => {
		const data = {
			name: "Luis Joaquín",
			email: "luisjoaquinvillegasarcia@gmail.com",
			password: "Algo*1607",
			id: "1",
			emailVerified: false,
			role: ["user"],
			methodsOfLogin: ["email"],
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const user = UserEntity.toObject(data);

		expect(user).toBeInstanceOf(UserEntity);
		expect(user.name).toBe(data.name);
		expect(user.email).toBe(data.email);
		expect(user.password).toBe(data.password);
		expect(user.id).toBe(data.id);
		expect(user.emailVerified).toBe(data.emailVerified);
		expect(user.role).toEqual(data.role);
		expect(user.createdAt).toBeInstanceOf(Date);
		expect(user.updatedAt).toBeInstanceOf(Date);
	});

	it("should create a new user without id", () => {
		try {
			const data = {
				name: "Luis Joaquín",
				email: "luisjva@gmail.com",
				password: "Algo*1607",
				emailVerified: false,
				role: ["user"],
				methodsOfLogin: ["email"],
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			UserEntity.toObject(data);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Id is required");
		}
	});

	it("should create a new user without email", () => {
		try {
			const data = {
				name: "Luis Joaquín",
				password: "Algo*1607",
				id: "1",
				emailVerified: false,
				role: ["user"],
				methodsOfLogin: ["email"],
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			UserEntity.toObject(data);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Email is required");
		}
	});

	it("should create a new user without correct email", () => {
		try {
			const data = {
				name: "Luis Joaquín",
				email: "luisjva@gmail",
				password: "Algo*1607",
				id: "1",
				emailVerified: false,
				role: ["user"],
				methodsOfLogin: ["email"],
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			UserEntity.toObject(data);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Email is invalid");
		}
	});

	it("should create a new user without password", () => {
		try {
			const data = {
				name: "Luis Joaquín",
				email: "luisjva@gmail.com",
				id: "1",
				emailVerified: false,
				role: ["user"],
				methodsOfLogin: ["email"],
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			UserEntity.toObject(data);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Password is required");
		}
	});

	it("should create a new user without role", () => {
		try {
			const data = {
				name: "Luis Joaquín",
				email: "luisjva@gmail.com",
				password: "Algo*1607",
				id: "1",
				methodsOfLogin: ["email"],
				emailVerified: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			UserEntity.toObject(data);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("Role is required");
		}
	});

	it("should create a new user without createdAt", () => {
		try {
			const data = {
				name: "Luis Joaquín",
				email: "luisjva@gmail.com",
				password: "Algo*1607",
				id: "1",
				emailVerified: false,
				role: ["user"],
				methodsOfLogin: ["email"],
				updatedAt: new Date(),
			};

			UserEntity.toObject(data);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("CreatedAt is required");
		}
	});

	it("should create a new user without updatedAt", () => {
		try {
			const data = {
				name: "Luis Joaquín",
				email: "luisjva@gmail.com",
				password: "Algo*1607",
				id: "1",
				emailVerified: false,
				role: ["user"],
				methodsOfLogin: ["email"],
				createdAt: new Date(),
			};

			UserEntity.toObject(data);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("UpdatedAt is required");
		}
	});

	it("should create a new user without methodsOfLogin", () => {
		try {
			const data = {
				name: "Luis Joaquín",
				email: "luisjva@gmail.com",
				password: "Algo*1607",
				id: "1",
				emailVerified: false,
				role: ["user"],
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			UserEntity.toObject(data);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe("MethodsOfLogin is required");
		}
	});
});
