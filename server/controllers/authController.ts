import User from "../models/User";
import { Request, Response } from "express";
import createJWT from "../utils/createJwt";

export async function signUp(req: Request, res: Response, next: () => unknown) {
	try {
		const { username, password } = req.body;
		const createdAt = Date();

		if(!username || !password )
			return res.status(400).json({message: "username or password not found"});

		console.log("Sign up request: ", username);
		
		const userExists = await User.findOne({ username: username });

		if (userExists) {
			return res.status(409).json({ message: "User already exists" });
		}

		const user = await User.create({ username, password, createdAt });
		const token = createJWT(user._id);

		res.cookie("token", token, {
			secure: true,
			httpOnly: false,
		});

		res
			.status(201)
			.json({ message: "User signed in successfully", success: true, user });

		next();
	} catch (e) {
		return res.status(400).json({ message: `An error happened: ${e}`})
		console.error(e);
	}
}

export async function login(req: Request, res: Response, next: () => unknown) {
	try {
		next();
	} catch (e) {
		console.error(e);
	}
}
