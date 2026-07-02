// frontend/src/hooks/useMessages.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageService } from '../services/messageService';
import { useAuth } from './useAuth';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';


import {
  selectMessagesByChannel,
  addOptimisticMessage,
  confirmMessage,
  failMessage,
  addMessage,
} from '../slices/messagesSlice';

export const useMessages = (channelId) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const messages = useSelector((state) => selectMessagesByChannel(state, channelId));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const loadMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await messageService.getAll();
      data.forEach((msg) => dispatch(addMessage(msg)));
    } catch (err) {
      toast.error(t('toast.networkError'));
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text) => {
    if (!text?.trim()) return;

    const tempId = crypto.randomUUID();
    dispatch(addOptimisticMessage({ tempId, body: text, channelId, username: user }));

    setIsSending(true);
    setError(null);
    try {
      const response = await messageService.create({
        body: text,
        channelId,
        username: user,
        tempId,
      });
      dispatch(confirmMessage({ tempId, realMessage: response }));
    } catch (err) {
      dispatch(failMessage({ tempId }));
      toast.error(t('toast.networkError'));
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages,
    loading,
    error,
    isSending,
    loadMessages,
    sendMessage,
  };
};
