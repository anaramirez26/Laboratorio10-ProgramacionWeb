
import { useState, useEffect } from 'react';
import API from '../utils/api'; 

const salesReport = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await API.get('/api/sales/report');
                
                setSales(response.data); 
                setLoading(false);
            } catch (err) {
                setError('Error al cargar el reporte.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchSales();
    }, []);

    if (loading) {
        return <p>Cargando el reporte...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Reporte</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Suma Total</th>
                    </tr>
                </thead>
                <tbody>
                    {}
                    {sales.map((sale) => (
                        <tr key={sale.name}>
                            <td>{sale.name}</td>
                            <td>{sale.total_sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default salesReport;
