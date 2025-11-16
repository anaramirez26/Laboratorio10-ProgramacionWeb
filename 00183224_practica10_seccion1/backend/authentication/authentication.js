import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { pool } from '../data/connection.js';
import { JWT_SECRET } from '../middleware/token.js';
import  hashP  from '../utils/hash.js';

const signup = async (request, response) => {
    try {
        const { name, email, passwd } = request.body;

        if (!name || !email || !passwd) {
            return response.status(400).json({ message: 'Faltan campos: name, email o passwd' });
        }

        const hashedPasswd = await hashP.hashP(passwd);
        pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email',
            [name, email, hashedPasswd]
        );
        return response.status(201).json("Se ha realizado creado el usuario con exito.", { name, email});
    } catch (err) {
        console.error('createUser error:', err);
        return response.status(500).json({ message: 'Error al crear usuario' });
    }
};

const signin = async (req, res) => {
    const { email, passwd } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(passwd, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });

    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default {signup, signin};