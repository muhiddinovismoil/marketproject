import { Router } from "express";
import { getAllFromSavatcha } from "../controllers";
export const savatchaRouter = Router();
savatchaRouter.get("/all", getAllFromSavatcha);
savatchaRouter.delete("/:id", deleteFromSavatcha);
