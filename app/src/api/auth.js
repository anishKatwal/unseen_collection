import api from "./api";

const login = async (data) => {
  const response = await api.post(`/api/auth/login`, data);

  return response;
};

const register = async (data) => {
  const response = await api.post(`/api/auth/register`, data);

  return response;
};

const getSecurity = async () => {
  return await api.get("/");
};

export { login, register, getSecurity };
