// frontend/src/hooks/useMessages.js
import { useState, useCallback } from 'react';
import { messageService } from '../services/messageService';

export const useMessages = (channelId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  // Загрузка сообщений
  const loadMessages = useCallback(async () => {
    if (!channelId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await messageService.getMessages(channelId);
      setMessages(data);
    } catch (err) {
      setError(err.message || 'Ошибка загрузки сообщений');
    } finally {
      setLoading(false);
    }
  }, [channelId]);

  // Отправка сообщения
  const sendMessage = useCallback(
    async (text) => {
      if (!text?.trim() || isSending) return;

      setIsSending(true);
      setError(null);

      try {
        const newMessage = await messageService.sendMessage(channelId, text);
        setMessages((prev) => [...prev, newMessage]);
        return newMessage;
      } catch (err) {
        setError(err.message || 'Ошибка отправки сообщения');
        throw err;
      } finally {
        setIsSending(false);
      }
    },
    [channelId, isSending]
  );

  return {
    messages,
    loading,
    error,
    isSending,
    sendMessage,
    loadMessages,
    setMessages,
  };
};
