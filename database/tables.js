import pool from "./db.js";
export const createTables = async () => {
    try {
        const tables = [
            `CREATE TABLE IF NOT EXISTS market(
                id SERIAL PRIMARY KEY,
                name VARCHAR(60) NOT NULL UNIQUE,
                address VARCHAR(60) NOT NULL
            )`,
            `CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(40) NOT NULL,
                username VARCHAR(60) NOT NULL UNIQUE,
                email VARCHAR(60) NOT NULL UNIQUE,
                password VARCHAR(16) CHECK (LENGTH(password) >= 8) NOT NULL,
                market_id INT NOT NULL,
                CONSTRAINT fk_market
                    FOREIGN KEY(market_id)
                    REFERENCES market(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            )`,
            `CREATE TABLE IF NOT EXISTS savatcha(
                id SERIAL PRIMARY KEY,
                product_id INT NOT NULL,
                user_id INT NOT NULL,
                market_id INT NOT NULL,
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                CONSTRAINT fk_market
                    FOREIGN KEY(market_id)
                    REFERENCES market(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            )`,
            `CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                productname VARCHAR(50) NOT NULL,
                price FLOAT NOT NULL,
                description TEXT NOT NULL,
                user_id INT NOT NULL,
                market_id INT NOT NULL,
                savatcha_id INT NOT NULL,
                CONSTRAINT fk_market
                    FOREIGN KEY(market_id)
                    REFERENCES market(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                CONSTRAINT fk_savatcha
                    FOREIGN KEY(savatcha_id)
                    REFERENCES savatcha(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            )`,
            `CREATE TABLE IF NOT EXISTS comments(
                id SERIAL PRIMARY KEY,
                rate SMALLINT NOT NULL,
                comment TEXT NOT NULL,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                CONSTRAINT fk_products
                    FOREIGN KEY(product_id)
                    REFERENCES products(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            )`,
        ];
        for (let table of tables) {
            await pool.query(table);
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
