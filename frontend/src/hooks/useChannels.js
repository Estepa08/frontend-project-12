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

  return {
    channels,
    activeChannelId,
    loading,
    error,
    loadChannels,
    switchChannel,
  };
};
