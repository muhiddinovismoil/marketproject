import pool from "../database/db.js";
export async function createMarket(req, res, next) {
    try {
        const { name, address } = req.body;
        if (!name || !address) {
            return res.status(400).send("Error");
        }
        await pool.query(`INSERT INTO market(name,address) Values($1,$2)`, [
            name,
            address,
        ]);
        res.status(200).send("succesfully created market");
    } catch (error) {
        next(error);
    }
}
export async function getAllMarkets(req, res, next) {
    try {
        const data = await pool.query("SELECT * FROM market");
        console.log(data.rows);
        res.status(200).send(data.rows);
    } catch (error) {
        next(error);
    }
}
