// frontend/src/hooks/useAuth.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/auth';
import {
  connect as connectSocket,
  disconnect as disconnectSocket,
} from '../services/socketService';
import { login, logout, setLoading, setError } from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  // Восстановление сессии при загрузке страницы
  useEffect(() => {
    const token = authService.getToken();
    const savedUser = authService.getUser();
    if (token && savedUser) {
      dispatch(login({ user: savedUser.username, token }));
      connectSocket(token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      dispatch(setLoading(true));
      const data = await authService.login(credentials);
      dispatch(login({ user: data.username, token: data.token }));
      connectSocket(data.token);
      return data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Ошибка входа'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    disconnectSocket();
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };
};
