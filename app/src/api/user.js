import api from "./api";

async function getAllUsers(query) {
  const response = await api.get(`/api/users?${query}`);

  return response.data;
}

async function getStaffs() {
  const response = await api.get(`/api/users/employees`);

  return response.data;
}

async function getUserById(id) {
  const response = await api.get(`/api/users/${id}`);

  return response.data;
}

async function createUser(data) {
  const response = await api.post(`/api/users/`, data);

  return response;
}

async function updateUser(id, data) {
  const response = await api.put(`/api/users/${id}`, data);

  return response;
}

async function deleteUser(id) {
  const response = await api.delete(`/api/users/${id}`);

  return response;
}

export {
  updateUser,
  getUserById,
  getAllUsers,
  deleteUser,
  getStaffs,
  createUser,
};
