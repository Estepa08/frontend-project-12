// frontend/src/hooks/useChat.js
import { useAuth } from './useAuth';
import { useChannels } from './useChannels';
import { useMessages } from './useMessages';

export const useChat = () => {
  const { user } = useAuth();
  const { channels, activeChannelId, loadChannels } = useChannels();
  const { messages, loading, error, isSending, sendMessage, loadMessages } =
    useMessages(activeChannelId);

  return {
    channels,
    activeChannelId,
    messages,
    loading,
    error,
    isSending,
    sendMessage,
    loadMessages,
    loadChannels,
    user,
  };
};
