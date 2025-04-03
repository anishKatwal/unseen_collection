import api from "./api";

async function getSchedules() {
  const response = await api.get(`/api/schedules`);

  return response;
}

async function getScheduleById(id) {
  const response = await api.get(`/api/schedules/${id}`);

  return response;
}

async function createSchedule(data) {
  const response = await api.post(`/api/schedules`, data);

  return response;
}

async function updateSchedule(id, data) {
  const response = await api.put(`/api/schedules/${id}`, data);

  return response;
}

async function deleteSchedule(id) {
  const response = await api.delete(`/api/schedules/${id}`);

  return response;
}

export {
  getSchedules,
  createSchedule,
  deleteSchedule,
  getScheduleById,
  updateSchedule,
};
