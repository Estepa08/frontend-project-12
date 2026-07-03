// frontend/src/services/api.js
import axios from 'axios';
import { toast } from 'react-toastify';
import i18n from '../i18n.js';

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Интерцептор запросов — добавляем токен
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор ответов — централизованная обработка ошибок
api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // Нет соединения с сервером
    if (!status) {
      toast.error(i18n.t('toast.networkError'));
    }

    // Ошибки сервера (5xx) — централизуем
    if (status >= 500) {
      toast.error(i18n.t('toast.networkError'));
    }

    // 4xx ошибки — пробрасываем дальше
    // чтобы хуки сами решали что показывать
    // (например 409 → сообщение в форме, 401 → редирект)
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;