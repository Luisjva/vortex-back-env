import { jwtAdapter } from "../../src/config/jwt.adapter";

describe("jwt adapter", () => {
	it("should generate a token", () => {
		const token = jwtAdapter.generateToken({ id: 1 });
		expect(token).toBeDefined();
		expect(typeof token).toBe("string");
	});

	it("should verify a token", () => {
		const token = jwtAdapter.generateToken({ id: 1 });
		const decoded = jwtAdapter.verifyToken(token);
		expect(decoded).toBeDefined();
		expect(decoded).toBeInstanceOf(Object);
	});

	it("should verify a invalid token", () => {
		try {
			const token = jwtAdapter.generateToken({ id: 1 });
			const decoded = jwtAdapter.verifyToken(token + "invalid");
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}
	});
});
