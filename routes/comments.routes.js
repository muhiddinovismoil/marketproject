import { Router } from "express";
import { addComment, showComments } from "../controllers/index.js";
export const commentRouter = Router();
commentRouter.post("/:id/add", addComment);
commentRouter.get("/show", showComments);
