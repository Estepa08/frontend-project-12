// frontend/src/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/auth';
import { login, logout, setLoading, setError } from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    try {
      dispatch(setLoading(true));
      const data = await authService.login(credentials);
      dispatch(login({ user: data.username, token: data.token }));
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
