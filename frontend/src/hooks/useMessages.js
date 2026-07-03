// frontend/src/hooks/useMessages.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageService } from '../services/messageService';
import { useAuth } from './useAuth';
import { cleanMessage } from '../utils/profanityFilter';
import {
  selectMessagesByChannel,
  addOptimisticMessage,
  confirmMessage,
  failMessage,
  addMessage,
} from '../slices/messagesSlice';

export const useMessages = (channelId) => {
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text) => {
    if (!text?.trim()) return;
    const tempId = crypto.randomUUID();
    const cleanedText = cleanMessage(text);
    dispatch(addOptimisticMessage({ tempId, body: cleanedText, channelId, username: user }));
    setIsSending(true);
    setError(null);
    try {
      const response = await messageService.create({
        body: cleanedText,
        channelId,
        username: user,
        tempId,
      });
      dispatch(confirmMessage({ tempId, realMessage: response }));
    } catch (err) {
      dispatch(failMessage({ tempId }));
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