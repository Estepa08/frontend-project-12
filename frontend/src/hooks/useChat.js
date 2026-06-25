// frontend/src/hooks/useChat.js
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './useAuth';
import { selectChannels, selectActiveChannelId } from '../slices/channelsSlice';
import { selectMessagesByChannel, addMessage } from '../slices/messagesSlice';

export const useChat = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  // Данные из Redux
  const channels = useSelector(selectChannels);
  const activeChannelId = useSelector(selectActiveChannelId);
  const messages = useSelector((state) => selectMessagesByChannel(state, activeChannelId));

  // Отправка сообщения
  const sendMessage = (text) => {
    if (!text?.trim()) return;

    dispatch(
      addMessage({
        channelId: activeChannelId,
        text: text.trim(),
        username: user || 'Я',
      })
    );
  };

  return {
    channels,
    activeChannelId,
    messages,
    sendMessage,
    user,
  };
};
