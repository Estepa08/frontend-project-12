// frontend/src/hooks/useChannels.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { chatService } from '../services/chatService';
import {
  selectChannels,
  selectActiveChannelId,
  setChannels,
  setActiveChannel,
} from '../slices/channelsSlice';

export const useChannels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      toast.error(t('toast.loadError'));
      setError(err.message);
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
      dispatch(setActiveChannel(data.id));
      toast.success(t('toast.channelAdded'));
      return data;
    } catch (err) {
      toast.error(t('toast.networkError'));
      setError(err.message);
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
      toast.success(t('toast.channelRemoved'));
    } catch (err) {
      toast.error(t('toast.networkError'));
      setError(err.message);
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
      toast.success(t('toast.channelRenamed'));
    } catch (err) {
      toast.error(t('toast.networkError'));
      setError(err.message);
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
