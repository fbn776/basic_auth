import User from "../models/User";
import { Request, Response } from "express";
import createJWT from "../utils/createJwt";
import bcrypt from "bcrypt";

export async function signUp(req: Request, res: Response, next: () => unknown) {
	try {
		const { username, password } = req.body;
		const createdAt = Date();

		if (!username || !password)
			return res
				.status(400)
				.json({ message: "username or password not found" });

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
		console.error(e);
		return res.status(400).json({ message: `An error happened: ${e}` });
	}
}

export async function login(req: Request, res: Response, next: () => unknown) {
	const { username, password } = req.body;

	try {
		if (!username || !password)
			return res.status(400).json({ message: "All fields are required" });

		const user = await User.findOne({ username });

		if (!user)
			return res.status(401).json({ message: "Incorrect password or username" });

		const auth = await bcrypt.compare(password, user.password);

		if (!auth)
			return res.status(401).json({ message: "Incorrect password or username" });

		const token = createJWT(user._id);
		
		res.cookie("token", token, {
			secure: true,
			httpOnly: false,
		});

		res.status(201).json({ message: "User logged in successfully", success: true });

		next();
	} catch (error) {
		console.error(error);
	}
}
