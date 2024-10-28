import pool from "../database/db.js";
export async function addProduct(req, res, next) {
    try {
        const {
            productname,
            price,
            description,
            user_id,
            market_id,
            savatcha_id,
        } = req.body;
        if (
            !productname ||
            !price ||
            !description ||
            !user_id ||
            !market_id ||
            !savatcha_id
        ) {
            return res
                .status(400)
                .send("Please complete all things to add product");
        }
        await pool.query(
            `INSERT INTO products(productname,price,description,user_id,market_id,savatcha_id)
            VALUES($1,$2,$3,$4,$5,$6)`,
            [productname, price, description, user_id, market_id, savatcha_id]
        );
        res.status(200).send("Successfully added your product to the market");
    } catch (error) {
        next(error);
    }
}
export async function readProduct(req, res, next) {
    try {
        const data = await pool.query(
            "SELECT productname,price,description FROM products"
        );
        res.status(200).send(data.rows);
    } catch (error) {
        next(error);
    }
}
export async function updateProduct(req, res, next) {
    try {
        const id = +req.params.id;
        const { productname } = req.body;
        await pool.query(
            `UPDATE products SET productname = $1 WHERE id = $2 `,
            [productname],
            [id]
        );
    } catch (error) {
        next(error);
    }
}
export async function deleteProduct(req, res, next) {
    try {
    } catch (error) {
        next(error);
    }
}
