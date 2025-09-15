import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setCurrentUser }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/login', form);
            
            // Assuming backend returns { token: "JWT_TOKEN" }
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('name', response.data.user);
            setCurrentUser(response.data.user ); // You might want to store more user info here

            
            
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mb-2 w-full p-2 border rounded"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="mb-2 w-full p-2 border rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white rounded p-2">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
