import { Router } from "express";
import { createMarket, getAllMarkets } from "../controllers/index.js";
export const marketRouter = Router();
marketRouter.post("/create", createMarket);
marketRouter.get("/getall", getAllMarkets);
