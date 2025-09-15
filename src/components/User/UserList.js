import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import UpdateUser from "./UpdateUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8081/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8081/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user: " + err.message);
    }
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8081/api/users/${updatedUser.userId}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingUser(null); // close modal
      fetchUsers(); // refresh user list
    } catch (err) {
      alert("Failed to update user: " + err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.userId}
            className="flex items-center bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <FaUserCircle size={50} className="text-gray-400 mr-4" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Role:</span> {user.role}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setEditingUser(user)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition transform hover:scale-110"
                title="Edit User"
              >
                <FiEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(user.userId)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition transform hover:scale-110"
                title="Delete User"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <UpdateUser
              user={editingUser}
              onSubmit={handleUpdate}
              onCancel={() => setEditingUser(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
