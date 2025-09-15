import axios from 'axios';

const API_URL = 'http://localhost:8081/api/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUsers = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`,   getAuthHeaders());
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post(API_URL, userData, getAuthHeaders());
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData, getAuthHeaders());
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};
export async function getVacantUsers() {
    // Replace with your actual API endpoint
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Failed to fetch vacant users');
    return response.json();
}
// ...existing code...