// frontend/src/services/auth.js
import api from './api';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  getUser: () => {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  setUser: (userData) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  getUserId: () => {
    const user = authService.getUser();
    return user?.id || null;
  },

  signup: async (userData) => {
    const response = await api.post('/signup', userData);
    if (response.data.token) {
      authService.setToken(response.data.token);
      authService.setUser(response.data.user || { username: userData.username });
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      authService.setToken(response.data.token);
      authService.setUser(response.data.user || { username: credentials.username });
    }
    return response.data;
  },

  logout: () => {
    authService.removeToken();
    authService.removeUser();
  },
};
