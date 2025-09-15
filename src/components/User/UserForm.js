import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../services/userService';
import { getVacantManagers } from '../../services/managerService';

const UserForm = ({ user, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        managerId: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [managers, setManagers] = useState([]);

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                managerId: user.managerId || '',
            });
            setIsModalOpen(true);
        }
    }, [user]);

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await getVacantManagers();
                setManagers(response);
            } catch (error) {
                console.error('Error fetching managers:', error);
            }
        };
        fetchManagers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            await updateUser(user.id, formData);
        } else {
            await createUser(formData);
        }
        onSubmit();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showManagerDropdown = formData.role === 'Developer' || formData.role === 'Tester';

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-6">
                <h1 className="text-3xl font-bold text-yellow-400">Users</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 12c2.7 0 4.88-2.18 4.88-4.88S14.7 2.24 12 2.24 7.12 4.42 7.12 7.12 9.3 12 12 12zm0 2.24c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                    Add User
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
                    <div className="bg-black rounded-xl shadow-xl p-6 w-full max-w-md mx-4 max-h-[60vh]  overflow-y-auto relative">
                        <button
                            onClick={handleCancel}
                            className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-600 font-bold text-lg"
                        >
                            ×
                        </button>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 overflow">
                            <h2 className="text-2xl font-bold mb-2 text-yellow-400 text-center">
                                {user ? 'Update User' : 'Create User'}
                            </h2>

                            <div>
                                <label className="block text-yellow-300 text-sm font-semibold mb-1">Firstname</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="w-full py-2 px-3 rounded-lg border border-yellow-400 bg-black text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-yellow-300 text-sm font-semibold mb-1">Lastname</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="w-full py-2 px-3 rounded-lg border border-yellow-400 bg-black text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-yellow-300 text-sm font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full py-2 px-3 rounded-lg border border-yellow-400 bg-black text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    required
                                />
                            </div>

                            {/* Role Dropdown */}
                            <div>
                                <label className="block text-yellow-300 text-sm font-semibold mb-1">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full py-2 px-3 rounded-lg border border-yellow-400 bg-black text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Tester">Tester</option>
                                </select>
                            </div>

                            {/* Manager Dropdown */}
                            {showManagerDropdown && (
                                <div>
                                    <label className="block text-yellow-300 text-sm font-semibold mb-1">Assign Manager</label>
                                    <select
                                        name="managerId"
                                        value={formData.managerId}
                                        onChange={handleChange}
                                        className="w-full py-2 px-3 rounded-lg border border-yellow-400 bg-black text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                        required
                                    >
                                        <option value="">Select Manager</option>
                                        {managers.map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.firstname} {m.lastname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-700 text-yellow-400 font-bold py-2 px-4 rounded-lg shadow hover:bg-gray-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    {user ? 'Update User' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserForm;
