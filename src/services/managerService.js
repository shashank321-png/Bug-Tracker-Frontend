import api from "./api";


export async function getVacantManagers() {
  const response = await api.get("/api/managers");
  return response.data;
}