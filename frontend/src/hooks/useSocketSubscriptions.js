// frontend/src/hooks/useSocketSubscriptions.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  subscribeToMessages,
  unsubscribeFromMessages,
  subscribeToChannels,
  unsubscribeFromChannels,
} from '../services/socketService';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setActiveChannel,
} from '../slices/channelsSlice';
import { removeMessagesByChannel } from '../slices/messagesSlice';

export const useSocketSubscriptions = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleNewMessage = (payload) => {
      dispatch(addMessage(payload));
    };

    const channelCallbacks = {
      onAdd: (payload) => {
        dispatch(addChannel(payload));
      },
      onRemove: (payload) => {
        // Удаляем сообщения канала, потом сам канал
        // (removeChannel в слайсе сам переключит activeChannelId если нужно)
        dispatch(removeMessagesByChannel(payload.id));
        dispatch(removeChannel(payload));
      },
      onRename: (payload) => {
        dispatch(renameChannel(payload));
      },
    };

    subscribeToMessages(handleNewMessage);
    subscribeToChannels(channelCallbacks);

    return () => {
      unsubscribeFromMessages(handleNewMessage);
      unsubscribeFromChannels(channelCallbacks);
    };
  }, [isAuthenticated, dispatch]);
};
