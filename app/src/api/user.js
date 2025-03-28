import api from "./api";

async function getUserById(id) {
  const response = await api.get(`/api/users/${id}`);

  return response.data;
}

async function updateUser(id, data) {
  const response = await api.put(`/api/users/${id}`, data);

  return response.data;
}

export { updateUser, getUserById };
