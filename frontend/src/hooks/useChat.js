// frontend/src/hooks/useChat.js
import { useAuth } from './useAuth';
import { useChannels } from './useChannels';
import { useMessages } from './useMessages';

export const useChat = () => {
  const { user } = useAuth();
  const {
    channels,
    activeChannelId,
    loading: channelsLoading,
    loadChannels,
    switchChannel,
    createChannel,
    deleteChannel,
    updateChannel,
  } = useChannels();

  const {
    messages,
    loading: messagesLoading,
    error,
    isSending,
    sendMessage,
    loadMessages,
  } = useMessages(activeChannelId);

  return {
    channels,
    activeChannelId,
    messages,
    loading: channelsLoading || messagesLoading,
    error,
    isSending,
    sendMessage,
    loadMessages,
    loadChannels,
    switchChannel,
    createChannel,
    deleteChannel,
    updateChannel,
    user,
  };
};
