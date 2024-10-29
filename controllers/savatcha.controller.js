import pool from "../database/db.js";
import path from "path";
import fs from "fs";
let filePath = path.join(process.cwd(), "controllers", "user.txt");
export async function getAllFromSavatcha(req, res, next) {
    try {
        const id = fs.readFileSync(filePath, "utf-8");
        const data = await pool.query(
            `SELECT p.productname,p.price,p.description
            FROM savatcha s
            JOIN products p ON s.product_id = p.id
            WHERE s.user_id = $1;`,
            [id]
        );
        res.status(200).send(data.rows);
    } catch (error) {
        next(error);
    }
}
export async function deleteFromSavatcha(req, res, next) {
    try {
    } catch (error) {
        next(error);
    }
}
