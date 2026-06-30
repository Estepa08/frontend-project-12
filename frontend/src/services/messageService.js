// frontend/src/services/messageService.js
import api from './api';

export const messageService = {
  getAll: async () => {
    const response = await api.get('/messages');
    return response.data;
  },

  create: async ({ body, channelId, username, tempId }) => {
    const response = await api.post('/messages', { body, channelId, username, tempId });
    return response.data;
  },

  update: async (id, { body }) => {
    const response = await api.patch(`/messages/${id}`, { body });
    return response.data;
  },

  remove: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
};
