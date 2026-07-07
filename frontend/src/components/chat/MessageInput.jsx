// frontend/src/components/chat/MessageInput.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MessageInput = ({ onSend, loading, activeChannelName }) => {
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSend(newMessage.trim());
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form
        className="py-1 border rounded-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="input-group has-validation">
          <input
            name="body"
            autoComplete="off"
            aria-label={t('chat.messageInputLabel')}
            placeholder={t('chat.inputPlaceholder', {
              channelName: activeChannelName || 'general',
            })}
            className="border-0 p-0 ps-2 form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || loading}
            className="btn btn-primary btn-group-vertical"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 6.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 8.5z"
              />
            </svg>
            <span className="visually-hidden">{t('chat.send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
