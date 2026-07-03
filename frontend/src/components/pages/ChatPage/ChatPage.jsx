// frontend/src/components/pages/ChatPage/ChatPage.jsx
import { useState, useEffect } from 'react';
import { useChat } from '../../../hooks/useChat';
import ChannelsSidebar from '../../chat/ChannelsSidebar';
import ChatHeader from '../../chat/ChatHeader';
import MessagesList from '../../chat/MessagesList';
import MessageInput from '../../chat/MessageInput';
import { AddChannelModal, RemoveChannelModal, RenameChannelModal } from '../../modals';

const ChatPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

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
        <ChannelsSidebar
          channels={channels}
          activeChannelId={activeChannelId}
          onSwitch={switchChannel}
          onAdd={() => setAddModalOpen(true)}
          onRename={(channel) => {
            setSelectedChannel(channel);
            setRenameModalOpen(true);
          }}
          onRemove={(channel) => {
            setSelectedChannel(channel);
            setRemoveModalOpen(true);
          }}
        />

        <div className="col p-0 h-100">
          <ChatHeader activeChannel={activeChannel} />
          <MessagesList messages={messages} user={user} />
          <MessageInput
            onSend={sendMessage}
            loading={loading}
            activeChannelName={activeChannel?.name}
          />
        </div>
      </div>

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
    </div>
  );
};

export default ChatPage;
