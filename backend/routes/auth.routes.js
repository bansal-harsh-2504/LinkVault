import { loginUser, registerUser } from "../controllers/auth.controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/signup", registerUser);

export default authRouter;
