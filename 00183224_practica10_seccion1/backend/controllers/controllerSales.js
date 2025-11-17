import { pool } from '../data/connection.js';

const postSales = async (request, response) => {
    try {
        const { amount, id_customer} = request.body;

        if (!amount || !id_customer) {
            return response.status(400).json({ message: 'Faltan campos: amount o id_customer' });
        }

        const customerResults = await pool.query('SELECT id FROM customers WHERE id = $1', [id_customer]);
        if (customerResults.rowCount === 0) {
            return response.status(404).json({ error: `El cliente con id ${id_customer} no existe.` });
        }
        console.log("Se ha encontrado al cliente.");
        const insertResults = await pool.query(
            'INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING *',
            [amount, id_customer]
        );
        return response.status(201).json({
            message: "Se ha creado la venta con exito."
        });
    } catch (err) {
        return response.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getSalesCustomer =  (request, response) => {
    try {
        const results = pool.query(`SELECT s.id, s.amount, s.created_at, c.name
                FROM sales s
                JOIN customers c ON s.id_customer = c.id`, (error, results) => {
                if (error) {
                    console.error("Error al obtener los datos de la ventas clientes:", error);
                    response.status(500).json({ error: "Error interno del servidor" });
                    return;
                }
                response.status(200).json(results.rows);
            })
    } catch (err) {
        return response.status(500).json({ message: 'Error interno del servidor' });
    }
};

const totalSalesByCustomer = (request, response) => {
    try {
        const results = pool.query(`SELECT c.name, SUM(s.amount) AS total_sales
                FROM sales s
                JOIN customers c ON s.id_customer = c.id
                GROUP BY c.name`, (error, results) => {
                if (error) {
                    console.error("Error al obtener el total de ventas por cliente:", error);   
                    response.status(500).json({ error: "Error interno del servidor" });
                    return;
                }
                response.status(200).json(results.rows);
            }
        )
    } catch (err) {
        return response.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default {
    postSales,
    getSalesCustomer,
    totalSalesByCustomer
};