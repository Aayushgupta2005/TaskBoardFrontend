import axios from "axios";

const API = axios.create({
  baseURL: "https://taskboardbackend-cvol.onrender.com/api/tasks",
});

export const fetchTasks = () => API.get("/");
export const createTask = (task) => API.post("/", task);
export const updateTask = (id, task) => API.put(`/${id}`, task);
export const deleteTask = (id) => API.delete(`/${id}`);
