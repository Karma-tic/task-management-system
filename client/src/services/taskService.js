import api from "./api";

export const getTasks = async (page = 1) => {
  const res = await api.get(`/api/tasks?page=${page}`);
  return res.data;
};

export const createTask = async (data) => {
  const res = await api.post("/api/tasks", data);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await api.put(`/api/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/api/tasks/${id}`);
  return res.data;
};
export const getTaskById = async (id) => {
  const res = await api.get(`/api/tasks/${id}`);
  return res.data;
};
