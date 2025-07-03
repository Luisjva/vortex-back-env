import { emailRegex } from "../../src/config";

describe("Regular Expression", () => {
	it("should match email", () => {
		expect(emailRegex.test("test@example.com")).toBe(true);
	});

	it("should not match email", () => {
		expect(emailRegex.test("test@example")).toBe(false);
	});
});
