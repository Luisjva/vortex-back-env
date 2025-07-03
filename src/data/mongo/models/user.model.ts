import mongoose from "mongoose";
import { emailRegex } from "../../../config";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		match: [emailRegex, "Email is invalid"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},

	emailVerified: {
		type: Boolean,
		default: false,
	},
	role: {
		type: [String],
		default: [],
	},
	nickname: {
		type: String,
		default: "",
	},
	avatar: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},

	methodsOfLogin: {
		type: [String],
		default: [],
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export const UserModel = mongoose.model("User", userSchema);
