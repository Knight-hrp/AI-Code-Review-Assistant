const bcrypt = require("bcrypt");
const pool = require("../config/db");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: "user already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "User Registered Successfully",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    register,
};