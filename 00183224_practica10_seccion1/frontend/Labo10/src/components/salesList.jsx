import { useState, useEffect } from 'react';
import API from '../utils/api';

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await API.get('/api/sales/list');
                
                setSales(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar las ventas clientes.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchSales();
    }, []);

    if (loading) {
        return <p>Cargando ventas clientes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>SALES LIST</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Monto</th>
                        <th>Fecha Creacion</th>
                        <th>Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {}
                    {sales.map((sales) => (
                        <tr key={sales.id}>
                            <td>{sales.id}</td>
                            <td>{sales.amount}</td>
                            <td>{sales.created_at}</td>
                            <td>{sales.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesList;
