// frontend/src/components/pages/ChatPage/ChatPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Layout, Typography, Avatar, Badge, Input } from 'antd';
import { useAuth } from '../../../hooks/useAuth';
import { useChat } from '../../../hooks/useChat';
import styles from './ChatPage.module.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const ChatPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const { logout } = useAuth();
  const navigate = useNavigate();

  const { channels, activeChannelId, messages, sendMessage, loadMessages, loadChannels, user } =
    useChat();

  useEffect(() => {
    loadChannels();
  }, []);

  useEffect(() => {
    if (activeChannelId) {
      loadMessages();
    }
  }, [activeChannelId]);

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

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed} className={styles.sider} width={200}>
        <div className={styles.logo}>
          <MessageOutlined className={styles.logoIcon} />
          {!collapsed && <span>Чат</span>}
        </div>

        <div className={styles.channelList}>
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`${styles.channelItem} ${
                activeChannelId === channel.id ? styles.channelItemActive : ''
              }`}
            >
              <MessageOutlined className={styles.channelItemIcon} />
              {!collapsed && <span className={styles.channelItemName}>{channel.name}</span>}
            </div>
          ))}
        </div>
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
              General
            </Title>
          </div>

          <div className={styles.headerRight}>
            <Badge dot status="success">
              <Avatar icon={<UserOutlined />} />
            </Badge>
            <Text className={styles.username}>{user || 'Пользователь'}</Text>
            <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout} danger>
              Выйти
            </Button>
          </div>
        </Header>

        <Content className={styles.content}>
          <div className={styles.messageContainer}>
            <div className={styles.messageList}>
              {messages.length > 0 ? (
                messages.map((msg) => {
                  const isSelf = msg.username === user;
                  return (
                    <div
                      key={msg.id || msg.tempId}
                      className={`${styles.messageItem} ${isSelf ? styles.messageItemSelf : ''}`}
                    >
                      <Avatar
                        className={styles.messageAvatar}
                        style={{
                          backgroundColor: isSelf ? '#1677ff' : '#52c41a',
                        }}
                      >
                        {msg.username?.[0]?.toUpperCase() || 'U'}
                      </Avatar>
                      <div className={styles.messageContent}>
                        <div className={styles.messageHeader}>
                          <span className={styles.messageUsername}>
                            {msg.username || 'Пользователь'}
                          </span>
                          {msg.status === 'pending' && (
                            <span className={styles.messageTime}>отправляется…</span>
                          )}
                          {msg.status === 'failed' && (
                            <span className={styles.messageTime} style={{ color: 'red' }}>
                              не отправлено
                            </span>
                          )}
                        </div>
                        <div className={styles.messageText}>{msg.body}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyState}>
                  <MessageOutlined className={styles.emptyStateIcon} />
                  <div className={styles.emptyStateTitle}>Сообщений пока нет</div>
                  <div className={styles.emptyStateText}>Напишите первое сообщение!</div>
                </div>
              )}
            </div>

            <div className={styles.messageInputWrapper}>
              <TextArea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Введите сообщение..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                className={styles.messageInput}
              />
              <button
                className={styles.sendButton}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <SendOutlined />
                Отправить
              </button>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatPage;
