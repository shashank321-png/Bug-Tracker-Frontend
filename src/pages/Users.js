import React, { useEffect, useState } from 'react';
import UserList from '../components/User/UserList';
import UserForm from '../components/User/UserForm';
import { getUsers } from '../services/userService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleUserFormSubmit = (user) => {
        setUsers((prevUsers) => {
            if (selectedUser) {
                return prevUsers.map((u) => (u.id === user.id ? user : u));
            }
            return [...prevUsers, user];
        });
        setSelectedUser(null);
    };

    return (
        <div className="p-4">
            
            <UserForm user={selectedUser} onSubmit={handleUserFormSubmit} />
            <UserList users={users} onSelect={handleUserSelect} />
        </div>
    );
};

export default Users;