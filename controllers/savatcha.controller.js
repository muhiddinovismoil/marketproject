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
        if (data.rows.length === 0) {
            return res.status(404).send("Not Found or Problem with data");
        }
        res.status(200).send(data.rows);
    } catch (error) {
        next(error);
    }
}
export async function deleteFromSavatcha(req, res, next) {
    try {
        const id = fs.readFileSync(filePath, "utf-8");
        await pool.query(
            `DELETE FROM savatcha
            WHERE user_id = $1;`,
            [id]
        );
        res.status.send("You completly removed product from savatcha");
    } catch (error) {
        next(error);
    }
}
