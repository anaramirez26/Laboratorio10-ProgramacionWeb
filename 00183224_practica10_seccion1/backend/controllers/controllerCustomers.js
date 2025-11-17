import { pool } from '../data/connection.js';

const getCustomers = (request, response) => {
    pool.query('SELECT * FROM customers', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getCustomerByCode = (request, response) => {
    const { code } = request.query;
    try {
    pool.query('SELECT * FROM customers WHERE code = $1', [code], (error, results) => {
        if (error) {
        console.error("Error al obtener el cliente", error);
        }
        response.status(200).json(results.rows);
    }
    );
    } catch (err) {
        return response.status(500).json({ message: 'Error interno del servidor' });
    }
}
export default {
    getCustomers,
    getCustomerByCode
};