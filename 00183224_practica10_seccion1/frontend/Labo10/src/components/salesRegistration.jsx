import { useState } from "react";
import API from "../utils/api.js";

const SalesRegistration = () => {
    const [monto, setAmount] = useState("");
    const [idCustomer, setIdCustomer] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const salesRegistration = async (e) => {
        e.preventDefault();
        
        setSuccessMessage('');
        setErrorMessage('');

        if (!monto || !idCustomer) {
            setErrorMessage('Ambos campos son obligatorios.');
            return;
        }

        try {
            
            const amount = parseFloat(monto); 
            const id_customer = parseInt(idCustomer) 
            
            const res = await API.post("/api/sales/", { amount, id_customer });

            setSuccessMessage(res.data);
            
            setAmount("");
            setIdCustomer("");

        } catch (err) {
            setErrorMessage(err.response?.data?.error || "Ocurrió un error");
        }
    };

    return (
        <form onSubmit={salesRegistration}>
            <h2>Registrar Venta</h2>
            
                <label htmlFor="monto">Monto:</label>
                <input 
                    type="number" 
                    id="monto" 
                    placeholder="Monto" 
                    value={monto} 
                    onChange={(e) => setAmount(e.target.value)} 
                    step="0.01"
                />
            
            
                <label htmlFor="idCustomer">ID Cliente:</label>
                <input 
                    type="number" 
                    id="idCustomer" 
                    placeholder="ID del Cliente" 
                    value={idCustomer} 
                    onChange={(e) => setIdCustomer(e.target.value)} 
                />
            
            
            <button type="submit">Registro Venta</button>
            
            {successMessage && <p>Registrado</p>}
            {errorMessage && <p>Error en la insercion</p>}
        </form>
    );
};

export default SalesRegistration;