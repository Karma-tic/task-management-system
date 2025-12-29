import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/api/users");
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/api/users/${id}`);
  return res.data;
};

export const makeAdmin = async (id) => {
  const res = await api.put(`/api/users/${id}/make-admin`);
  return res.data;
};
