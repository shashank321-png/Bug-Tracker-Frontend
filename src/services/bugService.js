import axios from 'axios';

const API_URL = 'http://localhost:8081/api/bugs';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getBugs = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

export const getBugById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};

export const createBug = async (bugData) => {
    const response = await axios.post(API_URL, bugData, getAuthHeaders());
    return response.data;
};

export const updateBug = async (id, bugData) => {
    const response = await axios.put(`${API_URL}/${id}`, bugData, getAuthHeaders());
    return response.data;
};

export const deleteBug = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};