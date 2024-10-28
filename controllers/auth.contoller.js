import pool from "../database/db.js";

export async function register(req, res, next) {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res
                .status(400)
                .send("Please send name username email and password correctly");
        }
        if (!password.length >= 8) {
            return res
                .status(400)
                .send("Please check username password or email !");
        }
        await pool.query(
            `INSERT INTO users(name,username,email,password,market_id)`,
            [name, username, email, password]
        );
        res.status(200).send("You are registered successfully");
    } catch (error) {
        next(error);
    }
}
export async function login(req, res, next) {
    try {
        res.status(200).send("successfully logged in");
    } catch (error) {
        next(error);
    }
}
export async function updatePassword(req, res, next) {
    try {
        const { password, confirmation, email } = req.body;
        if (!password || !confirmation) {
            return res.status(400).send("you changed nothing try again");
        }
        if (password != confirmation) {
            return res
                .status(400)
                .send("Problem with your password or confirmation");
        }
        await pool.query(`UPDATE users SET password = $1 where email = $2`, [
            password,
            email,
        ]);
        res.status(200).send("succesfully updated");
    } catch (error) {
        next(error);
    }
}
