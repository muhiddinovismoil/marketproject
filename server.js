import express from "express";
import dotenv from "dotenv";
import {
    authRouter,
    savatchaRouter,
    productsRouter,
    commentRouter,
    marketRouter,
} from "./routes/index.js";
import { connectDatabase, createTables } from "./database/index.js";
dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use("/market", marketRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/savatcha", savatchaRouter);
app.use("/comments", commentRouter);
app.listen(port, () => {
    console.log(`Server is working on ${port}`);
    connectDatabase(), createTables();
});
