// frontend/src/components/chat/MessagesList.jsx
import { useTranslation } from 'react-i18next';

const MessagesList = ({ messages, user, messagesEndRef }) => {
  const { t } = useTranslation();

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map((msg) => (
        <div key={msg.id || msg.tempId} className="text-break mb-2">
          <b>{msg.username}</b>
          {msg.status === 'pending' && (
            <span className="text-muted ms-1">{t('chat.messageSending')}</span>
          )}
          {msg.status === 'failed' && (
            <span className="text-danger ms-1">{t('chat.messageFailed')}</span>
          )}
          {': '}
          {msg.body}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;