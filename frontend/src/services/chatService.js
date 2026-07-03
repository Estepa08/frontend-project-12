// frontend/src/services/chatService.js
import api from './api';
import { messageService } from './messageService';

export const chatService = {
  // Получить все каналы
  getChannels: async () => {
    const response = await api.get('/channels');
    return response.data;
  },

  addChannel: async (name) => {
    const response = await api.post('/channels', { name });
    return response.data;
  },

  editChannel: async (channelId, name) => {
    const response = await api.patch(`/channels/${channelId}`, { name });
    return response.data;
  },

  removeChannel: async (channelId) => {
    const response = await api.delete(`/channels/${channelId}`);
    return response.data;
  },

export default chatService;
