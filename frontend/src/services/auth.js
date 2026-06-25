import api from './api';

const TOKEN_KEY = 'token';

export const authService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  signup: async (userData) => {
    const response = await api.post('/signup', userData);
    if (response.data.token) authService.setToken(response.data.token);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) authService.setToken(response.data.token);
    return response.data;
  },

  logout: () => authService.removeToken(),

  // Запрос с токеном
  getChannels: async () => {
    const token = authService.getToken();
    const response = await api.get('/channels', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
