import axios from "axios";

const API_URL = "http://localhost:8081/api/projects";

// Get JWT token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all projects
export const getProjects = async () => {
  try {
    console.log("Fetching projects with auth headers:", getAuthHeaders());
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data; // assuming backend returns List<Project>
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch projects");
  }
};
