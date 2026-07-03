// frontend/src/components/chat/ChatHeader.jsx
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ activeChannel }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {activeChannel?.name}</b>
      </p>
      <span className="text-muted">
        {t('chat.messagesCount', { count: 0 })}
      </span>
    </div>
  );
};

export default ChatHeader;