import { Router } from "express";
import {
    getAllFromSavatcha,
    deleteFromSavatcha,
} from "../controllers/index.js";
export const savatchaRouter = Router();
savatchaRouter.get("/all", getAllFromSavatcha);
savatchaRouter.delete("/:id", deleteFromSavatcha);
