import pool from "../database/db.js";
import path from "path";
import fs from "fs";
let filePath = path.join(process.cwd(), "controllers", "user.txt");
export async function addComment(req, res, next) {
    try {
        const product_id = +req.params.id;
        const user_id = fs.readFileSync(filePath, "utf-8");
        const { rate, comment } = req.body;
        if (!rate || !comment) {
            return res
                .status(400)
                .send(
                    "Rate or comment is not completed or valued with wrong things"
                );
        }
        await pool.query(
            `INSERT INTO comments(rate,comment,user_id,product_id)
            VALUES($1,$2,$3,$4)`,
            [rate, comment, user_id, product_id]
        );
        res.status(200).send("Comment successfully added to the product");
    } catch (error) {
        next(error);
    }
}
export async function showComments(req, res, next) {
    try {
        const id = fs.readFileSync(filePath, "utf-8");
        const data = await pool.query(
            `SELECT rate,comment FROM comments WHERE user_id = $1`,
            [id]
        );
        res.status(200).send(data.rows);
    } catch (error) {
        next(error);
    }
}
