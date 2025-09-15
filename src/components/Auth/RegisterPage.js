import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ currentUser }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'User'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Only admins can register new users
        if (currentUser && currentUser.role !== 'Admin') {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const res = await fetch('http://localhost:8081/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            console.log(res);
            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || 'Registration failed');
            }

            setSuccess('User registered successfully!');
            setForm({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                role: 'User'
            });

            // Redirect to login after success
            setTimeout(() => navigate('/login'), 1500);

        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Admin Register User</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {success && <div className="text-green-500 mb-2">{success}</div>}
            <form onSubmit={handleSubmit}>
                <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required className="mb-2 w-full p-2 border rounded" />
                <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required className="mb-2 w-full p-2 border rounded" />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="mb-2 w-full p-2 border rounded" />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="mb-2 w-full p-2 border rounded" />
                <select name="role" value={form.role} onChange={handleChange} className="mb-2 w-full p-2 border rounded">
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit" className="w-full bg-blue-500 text-white rounded p-2">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
