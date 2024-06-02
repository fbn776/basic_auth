import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();

const key = process.env.TOKEN_KEY || "Some very secret key";

function createJWT(id: ObjectId) {
	return jwt.sign({id}, key, {
		expiresIn: 2 * 24 * 60 * 50
	});
}

export default createJWT;