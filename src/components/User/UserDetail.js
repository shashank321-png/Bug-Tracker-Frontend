import React from 'react';

const UserDetail = ({ user }) => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Role: {user.role}</p>
            <p className="text-gray-700">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default UserDetail;