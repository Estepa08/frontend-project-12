// frontend/src/hooks/useChannels.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatService } from '../services/chatService';
import {
  selectChannels,
  selectActiveChannelId,
  setChannels,
  setActiveChannel,
} from '../slices/channelsSlice';

export const useChannels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const activeChannelId = useSelector(selectActiveChannelId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadChannels = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await chatService.getChannels();
      dispatch(setChannels(data));
    } catch (err) {
      setError(err.message || 'Ошибка загрузки каналов');
    } finally {
      setLoading(false);
    }
  };

  const switchChannel = (channelId) => {
    dispatch(setActiveChannel(channelId));
  };

  const createChannel = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const data = await chatService.addChannel(name);
      // Переключаемся в новый канал — требование задания
      dispatch(setActiveChannel(data.id));
      return data;
    } catch (err) {
      setError(err.message || 'Ошибка создания канала');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteChannel = async (channelId) => {
    setLoading(true);
    setError(null);
    try {
      await chatService.removeChannel(channelId);
      // Socket сам обработает removeChannel и переключит канал
    } catch (err) {
      setError(err.message || 'Ошибка удаления канала');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateChannel = async (channelId, name) => {
    setLoading(true);
    setError(null);
    try {
      await chatService.editChannel(channelId, name);
    } catch (err) {
      setError(err.message || 'Ошибка переименования канала');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    channels,
    activeChannelId,
    loading,
    error,
    loadChannels,
    switchChannel,
    createChannel,
    deleteChannel,
    updateChannel,
  };
};
