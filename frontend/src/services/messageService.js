// frontend/src/services/messageService.js
import api from './api';

export const messageService = {
  // Получить сообщения канала
  getMessages: async (channelId) => {
    const response = await api.get(`/channels/${channelId}/messages`);
    return response.data;
  },

  // Отправить сообщение
  sendMessage: async (channelId, text) => {
    const response = await api.post(`/channels/${channelId}/messages`, { text });
    return response.data;
  },

  // Удалить сообщение
  deleteMessage: async (messageId) => {
    await api.delete(`/messages/${messageId}`);
  },
};
