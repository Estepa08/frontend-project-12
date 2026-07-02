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
    } catch (err) {
      const status = err.response?.status;
      const message =
        status === 401
          ? 'login.errors.invalidCredentials'
          : 'errors.unknown';
      dispatch(setError(message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSignup = async (userData) => {
    try {
      dispatch(setLoading(true));
      const data = await authService.signup(userData);
      dispatch(login({ user: data.username, token: data.token }));
      connectSocket(data.token);
      return data;
    } catch (err) {
      const status = err.response?.status;
      const message = status === 409 ? 'signup.errors.userExists' : 'errors.unknown';
      dispatch(setError(message));
      throw err;
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
    signup: handleSignup,
    logout: handleLogout,
  };
};
