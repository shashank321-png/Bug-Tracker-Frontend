import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBug, FaFolderOpen } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-8 text-yellow-400">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black text-yellow-400 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-200">
                    <FaUser className="text-5xl mb-4" />
                    <h2 className="text-xl font-semibold mb-4">Users</h2>
                    <button
                        className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition mb-2 shadow"
                        onClick={() => navigate('/users')}
                    >
                        Show Details
                    </button>
                </div>
                <div className="bg-black text-yellow-400 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-200">
                    <FaBug className="text-5xl mb-4" />
                    <h2 className="text-xl font-semibold mb-4">Bugs</h2>
                    <button
                        className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition mb-2 shadow"
                        onClick={() => navigate('/bugs')}
                    >
                        Show Details
                    </button>
                </div>
                <div className="bg-black text-yellow-400 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-200">
                    <FaFolderOpen className="text-5xl mb-4" />
                    <h2 className="text-xl font-semibold mb-4">Projects</h2>
                    <button
                        className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition mb-2 shadow"
                        onClick={() => navigate('/projects')}
                    >
                        Show Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;