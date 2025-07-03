import { CustomError } from "../../../src/domain";

describe("CustomError", () => {
	it("should create a badRequest error", () => {
		const error = CustomError.badRequest("Test error");
		expect(error).toBeInstanceOf(CustomError);
		expect(error.code).toBe(400);
		expect(error.message).toBe("Test error");
	});

	it("should create a unauthorized error", () => {
		const error = CustomError.unauthorized("Test error");
		expect(error).toBeInstanceOf(CustomError);
		expect(error.code).toBe(401);
		expect(error.message).toBe("Test error");
	});

	it("should create a forbidden error", () => {
		const error = CustomError.forbidden("Test error");
		expect(error).toBeInstanceOf(CustomError);
		expect(error.code).toBe(403);
		expect(error.message).toBe("Test error");
	});

	it("should create a notFound error", () => {
		const error = CustomError.notFound("Test error");
		expect(error).toBeInstanceOf(CustomError);
		expect(error.code).toBe(404);
		expect(error.message).toBe("Test error");
	});

	it("should create a internalServer error", () => {
		const error = CustomError.internalServer("Test error");
		expect(error).toBeInstanceOf(CustomError);
		expect(error.code).toBe(500);
		expect(error.message).toBe("Test error");
	});
});
