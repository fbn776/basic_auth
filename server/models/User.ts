import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface I_User {
	username: string;
	password: string;
	createdAt: Date
}

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Your username is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Your password is required"],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

userSchema.pre("save", async function () {
	this.password = await bcrypt.hash(this.password, 12);
});



export default mongoose.model("User", userSchema);
