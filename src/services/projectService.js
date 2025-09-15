import axios from 'axios';

const API_URL = 'http://localhost:8081/api/projects';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProjects = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

export const getProjectById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await axios.post(API_URL, projectData, getAuthHeaders());
    return response.data;
};

export const updateProject = async (id, projectData) => {
    const response = await axios.put(`${API_URL}/${id}`, projectData, getAuthHeaders());
    return response.data;
};

export const deleteProject = async (id) => {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
// export async function getProjects() {
//     // Replace with your actual API endpoint
//     const response = await fetch('/api/projects');
//     if (!response.ok) throw new Error('Failed to fetch projects');
//     return response.json();
// }
// // ...existing code...