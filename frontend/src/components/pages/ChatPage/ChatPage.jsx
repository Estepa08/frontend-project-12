// frontend/src/components/pages/ChatPage/ChatPage.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
  SendOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Layout, Typography, Avatar, Input, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import { useChat } from '../../../hooks/useChat';
import { AddChannelModal, RemoveChannelModal, RenameChannelModal } from '../../modals';
import styles from './ChatPage.module.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const ChatPage = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
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

  useEffect(() => {
    loadChannels();
  }, []);
  useEffect(() => {
    if (activeChannelId) loadMessages();
  }, [activeChannelId]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

  const getChannelMenuItems = (channel) => [
    {
      key: 'rename',
      icon: <EditOutlined />,
      label: t('channels.rename'),
      onClick: () => {
        setSelectedChannel(channel);
        setRenameModalOpen(true);
      },
    },
    {
      key: 'remove',
      icon: <DeleteOutlined />,
      label: t('channels.remove'),
      danger: true,
      onClick: () => {
        setSelectedChannel(channel);
        setRemoveModalOpen(true);
      },
    },
  ];

  const activeChannel = channels.find((c) => c.id === activeChannelId);
  const channelNames = channels.map((c) => c.name);

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed} className={styles.sider} width={240}>
        <div className={styles.logo}>
          <MessageOutlined className={styles.logoIcon} />
          {!collapsed && <span>{t('chat.title')}</span>}
        </div>

        <div className={styles.channelList}>
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`${styles.channelItem} ${activeChannelId === channel.id ? styles.channelItemActive : ''}`}
            >
              <button
                type="button"
                className={styles.channelButton}
                onClick={() => switchChannel(channel.id)}
              >
                <MessageOutlined className={styles.channelItemIcon} />
                {!collapsed && <span className={styles.channelItemName}># {channel.name}</span>}
              </button>

              {channel.removable && !collapsed && (
                <Dropdown menu={{ items: getChannelMenuItems(channel) }} trigger={['click']}>
                  <Button
                    type="text"
                    size="small"
                    className={styles.channelMenuButton}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={t('channels.menu')}
                  >
                    ···
                  </Button>
                </Dropdown>
              )}
            </div>
          ))}
        </div>

        {!collapsed && (
          <div className={styles.addChannelWrapper}>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => setAddModalOpen(true)}
              block
            >
              +{t('channels.add')}
            </Button>
          </div>
        )}
      </Sider>

      <Layout>
        <Header className={styles.header}>
          <div className={styles.headerLeft}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className={styles.toggleButton}
            />
            <Title level={4} style={{ margin: 0 }}>
              # {activeChannel?.name || 'General'}
            </Title>
          </div>

          <div className={styles.headerRight}>
            <Avatar icon={<UserOutlined />} />
            <Text className={styles.username}>{user || t('chat.title')}</Text>
            <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} danger>
              {t('logout')}
            </Button>
          </div>
        </Header>

        <Content className={styles.content}>
          <div className={styles.messageContainer}>
            <div className={styles.messageList}>
              {messages.length > 0 ? (
                <>
                  {messages.map((msg) => {
                    const isSelf = msg.username === user;
                    return (
                      <div
                        key={msg.id || msg.tempId}
                        className={`${styles.messageItem} ${isSelf ? styles.messageItemSelf : ''}`}
                      >
                        <Avatar
                          className={styles.messageAvatar}
                          style={{ backgroundColor: isSelf ? '#1677ff' : '#52c41a' }}
                        >
                          {msg.username?.[0]?.toUpperCase() || 'U'}
                        </Avatar>
                        <div className={styles.messageContent}>
                          <div className={styles.messageHeader}>
                            <span className={styles.messageUsername}>{msg.username}</span>
                            {msg.status === 'pending' && (
                              <span className={styles.messageTime}>{t('chat.messageSending')}</span>
                            )}
                            {msg.status === 'failed' && (
                              <span className={styles.messageTime} style={{ color: 'red' }}>
                                {t('chat.messageFailed')}
                              </span>
                            )}
                          </div>
                          <div className={styles.messageText}>{msg.body}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className={styles.emptyState}>
                  <MessageOutlined className={styles.emptyStateIcon} />
                  <div className={styles.emptyStateTitle}>{t('chat.noMessages')}</div>
                  <div className={styles.emptyStateText}>{t('chat.noMessagesHint')}</div>
                </div>
              )}
            </div>

            <div className={styles.messageInputWrapper}>
              <TextArea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('chat.inputPlaceholder', {
                  channelName: activeChannel?.name || 'general',
                })}
                autoSize={{ minRows: 1, maxRows: 4 }}
                className={styles.messageInput}
              />
              <button
                type="button"
                className={styles.sendButton}
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || loading}
              >
                <SendOutlined />
                {t('chat.send')}
              </button>
            </div>
          </div>
        </Content>
      </Layout>

      <AddChannelModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddChannel}
        existingNames={channelNames}
        isLoading={loading}
      />
      <RemoveChannelModal
        isOpen={removeModalOpen}
        onClose={() => {
          setRemoveModalOpen(false);
          setSelectedChannel(null);
        }}
        onConfirm={handleRemoveChannel}
        isLoading={loading}
      />
      <RenameChannelModal
        isOpen={renameModalOpen}
        onClose={() => {
          setRenameModalOpen(false);
          setSelectedChannel(null);
        }}
        onSubmit={handleRenameChannel}
        existingNames={channelNames}
        currentName={selectedChannel?.name}
        isLoading={loading}
      />
    </Layout>
  );
};

export default ChatPage;
