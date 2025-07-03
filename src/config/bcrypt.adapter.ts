import bcrypt from "bcryptjs";

export const bcryptAdapter = {
	hash(password: string): string {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	},

	compare(password: string, hash: string): boolean {
		return bcrypt.compareSync(password, hash);
	},
};
