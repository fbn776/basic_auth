import { login, signUp } from "../controllers/authController";
import { Router } from "express";
import userVerification from "../middleware/auth";

const authRouter = Router();

authRouter.post("/signup", signUp);

authRouter.post("/login", login)

authRouter.post("/", userVerification);

export default authRouter;