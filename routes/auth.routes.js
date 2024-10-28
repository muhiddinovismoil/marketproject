import { Router } from "express";
import { login, updatePassword, register } from "../controllers/index.js";
export const authRouter = Router();
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.put("/update", updatePassword);
