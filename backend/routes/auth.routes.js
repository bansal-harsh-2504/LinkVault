import { loginUser, registerUser } from "../controllers/auth.controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.get("/login", loginUser);
authRouter.get("/register", registerUser);

export default authRouter;
