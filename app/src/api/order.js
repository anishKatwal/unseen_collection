import formatSearchParams from "../helpers/formatParams";
import api from "./api";

async function checkoutOrder(id, data) {
  const response = await api.put(`/api/orders/${id}/checkout`, data);

  return response.data;
}

async function confirmOrder(id, status, transactionId) {
  const response = await api.put(
    `/api/orders/${id}/confirm?status=${status}&transactionId=${transactionId}`
  );

  return response.data;
}

async function createOrder(data) {
  const response = await api.post(`/api/orders`, data);

  return response.data;
}

async function createTableOrder(data) {
  const response = await api.post(`/api/orders/table`, data);

  return response.data;
}

async function getOrders(query) {
  const response = await api.get(`/api/orders?${formatSearchParams(query)}`);

  return response.data;
}

async function getOrdersByUser(status, userId) {
  const response = await api.get(
    `/api/orders/users/${userId}?status=${status}`
  );

  return response.data;
}

async function updateOrderStatus(id, status) {
  const response = await api.put(`/api/orders/${id}/status`, {
    status,
  });

  return response.data;
}

async function deleteOrder(id) {
  const response = await api.delete(`/api/orders/${id}`);

  return response.data;
}

export {
  checkoutOrder,
  createOrder,
  getOrders,
  getOrdersByUser,
  confirmOrder,
  deleteOrder,
  createTableOrder,
  updateOrderStatus,
};
