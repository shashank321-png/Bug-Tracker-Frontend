import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaBug, FaTachometerAlt, FaFolderOpen, FaSignInAlt, FaUserPlus, FaBars } from 'react-icons/fa';

const navItems = [
    { to: '/', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/users', label: 'Users', icon: <FaUser /> },
    { to: '/projects', label: 'Projects', icon: <FaFolderOpen /> },
    { to: '/bugs', label: 'Bugs', icon: <FaBug /> },
];

const authItems = [
    { to: '/login', label: 'Login', icon: <FaSignInAlt /> },
    { to: '/register', label: 'Register', icon: <FaUserPlus /> },
];

const Sidebar = () => (
    <aside className="bg-black text-yellow-400 w-64 min-h-screen flex flex-col shadow-lg">
        <div className="p-5 font-bold text-xl border-b border-yellow-700 flex items-center">
            <FaBars className="mr-3 text-2xl" />
            Menu
        </div>
        <nav className="flex-1 p-4">
            {navItems.map(item => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `flex items-center py-2 px-4 rounded mb-2 hover:bg-yellow-900 transition ${isActive ? 'bg-yellow-900' : ''}`
                    }
                >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    {item.label}
                </NavLink>
            ))}
            <div className="mt-8 border-t border-yellow-700 pt-4">
                {authItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className="flex items-center py-2 px-4 rounded mb-2 hover:bg-yellow-700 hover:text-black transition"
                    >
                        <span className="mr-3 text-xl">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </nav>
        </aside>
    );
    
    export default Sidebar;