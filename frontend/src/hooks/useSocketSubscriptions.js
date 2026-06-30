// frontend/src/hooks/useSocketSubscriptions.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToMessages, unsubscribeFromMessages } from '../services/socketService';
import { addMessage } from '../slices/messagesSlice';

export const useSocketSubscriptions = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleNewMessage = (payload) => {
      dispatch(addMessage(payload));
    };

    subscribeToMessages(handleNewMessage);

    return () => {
      unsubscribeFromMessages(handleNewMessage);
    };
  }, [isAuthenticated, dispatch]);
};
