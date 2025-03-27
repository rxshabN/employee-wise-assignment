const TOKEN_KEY = "userToken";

export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export default {
  setToken,
  getToken,
  removeToken,
  isAuthenticated,
};
