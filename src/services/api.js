import axios from "axios";
import { getToken, removeToken } from "../utils/auth";
const BASE_URL = "https://reqres.in/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        removeToken();
        window.location.href = "/login";
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({
        error: "No response received from server",
      });
    } else {
      return Promise.reject({
        error: "Error setting up the request",
      });
    }
  }
);

export const login = async (email, password) => {
  try {
    return await apiClient.post("/login", { email, password });
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (page = 1) => {
  try {
    return await apiClient.get(`/users?page=${page}`);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    return await apiClient.put(`/users/${id}`, userData);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    return await apiClient.delete(`/users/${id}`);
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  getUsers,
  updateUser,
  deleteUser,
};
