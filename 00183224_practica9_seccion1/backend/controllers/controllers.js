
import { pool } from '../data/connection.js';
import hashP from '../utils/hash.js';

const displayHome = (request, response) => {
    response.status(200).json({ message: "Welcome to the User Management API" });
};

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const updateUser = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const { name, email, passwd } = request.body;
        const hashedPasswd = await hashP.hashP(passwd);

        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [name, email, hashedPasswd, id]
        );
        return response.status(201).json("Se ha realizado la actualización del usuario con exito.", { user: result.rows[0] });
    } catch (err) {
        console.error('updateUser error:', err);
        return response.status(500).json({ message: 'Error al actualizar usuario' });
    }

};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

export default {
    displayHome,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};