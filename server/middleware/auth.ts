import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
require("dotenv").config();

export default function userVerification(req: Request, res: Response) {
	const token = req.cookies.token;

	console.log("Token: ", token);

	if (!token) {
		return res.json({ status: false });
	}

	jwt.verify(
		token,
		process.env.TOKEN_KEY || "SomeVeryStrongKey",
		async (err, data) => {
			if (err) {
				return res.json({ message: "Auth failed" });
			} else {
				const user = await User.findById(data.id);
				if (user) return res.json({ status: true, user: user.username });
				else return res.json({ status: false });
			}
		}
	);
}
