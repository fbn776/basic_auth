import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const { PORT, MONGO_URL } = process.env;

app.use(express.json());
app.use(
	cors({
		origin: ["http://localhost:4000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(cookieParser());


mongoose
	.connect(MONGO_URL!)
	.then(() => console.log("MongoDB is  connected successfully"))
	.catch((err) => console.error(err));


app.get("/", (_, res) => {
	res.status(200).send("Yeppp... Working fine!");
});

app.use("/auth", authRouter);

app
	.listen(PORT, () => {
		console.log("Server running at PORT: ", PORT);
		console.log(`http://localhost:${PORT}`);
	})
	.on("error", (error) => {
		throw new Error(error.message);
	});
