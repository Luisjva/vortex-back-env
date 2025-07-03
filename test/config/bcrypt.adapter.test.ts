import { bcryptAdapter } from "../../src/config";

describe("bcrypt adapter", () => {
	it("should hash password", () => {
		const password = "password";
		const hash = bcryptAdapter.hash(password);
		expect(hash).toBeDefined();
	});

	it("should compare password", () => {
		const password = "password";
		const hash = bcryptAdapter.hash(password);
		expect(bcryptAdapter.compare(password, hash)).toBe(true);
	});
});
