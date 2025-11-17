import { useState } from "react";
import API from "../utils/api.js";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [passwd, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/auth/signin", { email, passwd });
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={passwd} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default SignIn;