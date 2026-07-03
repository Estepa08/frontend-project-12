// frontend/src/components/pages/ChatPage/ChatPage.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { useChat } from '../../../hooks/useChat';
import {
  AddChannelModal,
  RemoveChannelModal,
  RenameChannelModal,
} from '../../modals';

const ChatPage = () => {
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const {
    channels,
    activeChannelId,
    messages,
    sendMessage,
    loadMessages,
    loadChannels,
    switchChannel,
    createChannel,
    deleteChannel,
    updateChannel,
    loading,
    user,
  } = useChat();

  useEffect(() => { loadChannels(); }, []);
  useEffect(() => { if (activeChannelId) loadMessages(); }, [activeChannelId]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage.trim());
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddChannel = async (name) => {
    await createChannel(name);
    setAddModalOpen(false);
  };

  const handleRemoveChannel = async () => {
    await deleteChannel(selectedChannel.id);
    setRemoveModalOpen(false);
    setSelectedChannel(null);
  };

  const handleRenameChannel = async (name) => {
    await updateChannel(selectedChannel.id, name);
    setRenameModalOpen(false);
    setSelectedChannel(null);
  };

  const activeChannel = channels.find((c) => c.id === activeChannelId);
  const channelNames = channels.map((c) => c.name);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">

        {/* Сайдбар с каналами */}
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={() => setAddModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <span className="visually-hidden">{t('channels.add')}</span>
            </button>
          </div>

          <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels.map((channel) => (
              <li key={channel.id} className="nav-item w-100">
                {channel.removable ? (
                  <div className="d-flex dropdown btn-group">
                    <button
                      type="button"
                      className={`w-100 rounded-0 text-start btn ${activeChannelId === channel.id ? 'btn-secondary' : ''}`}
                      onClick={() => switchChannel(channel.id)}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </button>
                    <button
                      type="button"
                      className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${activeChannelId === channel.id ? 'btn-secondary' : ''}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-label={t('channels.menu')}
                    >
                      <span className="visually-hidden">{t('channels.menu')}</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => { setSelectedChannel(channel); setRenameModalOpen(true); }}
                        >
                          {t('channels.rename')}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => { setSelectedChannel(channel); setRemoveModalOpen(true); }}
                        >
                          {t('channels.remove')}
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={`w-100 rounded-0 text-start btn ${activeChannelId === channel.id ? 'btn-secondary' : ''}`}
                    onClick={() => switchChannel(channel.id)}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Основная область чата */}
        <div className="col p-0 h-100">
          {/* Хедер чата */}
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b># {activeChannel?.name}</b>
            </p>
          </div>

          {/* Список сообщений */}
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

          {/* Поле ввода */}
          <div className="mt-auto px-5 py-3">
            <form
              className="py-1 border rounded-2"
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            >
              <div className="input-group has-validation">
                <input
                  name="body"
                  aria-label={t('chat.messageInputLabel')}
                  placeholder={t('chat.inputPlaceholder', { channelName: activeChannel?.name || 'general' })}
                  className="border-0 p-0 ps-2 form-control"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || loading}
                  className="btn btn-group-vertical"
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
        </div>
      </div>

      {/* Модальные окна */}
      <AddChannelModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddChannel}
        existingNames={channelNames}
        isLoading={loading}
      />
      <RemoveChannelModal
        isOpen={removeModalOpen}
        onClose={() => { setRemoveModalOpen(false); setSelectedChannel(null); }}
        onConfirm={handleRemoveChannel}
        isLoading={loading}
      />
      <RenameChannelModal
        isOpen={renameModalOpen}
        onClose={() => { setRenameModalOpen(false); setSelectedChannel(null); }}
        onSubmit={handleRenameChannel}
        existingNames={channelNames}
        currentName={selectedChannel?.name}
        isLoading={loading}
      />
    </div>
  );
};

export default ChatPage;