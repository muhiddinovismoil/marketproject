import { Router } from "express";
import {
    addProduct,
    readProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/index.js";
export const productsRouter = Router();
productsRouter.post("/add", addProduct);
productsRouter.get("/show", readProduct);
productsRouter.put("/:id/update", updateProduct);
productsRouter.delete("/:id", deleteProduct);
