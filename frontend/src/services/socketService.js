// frontend/src/services/socketService.js
import { io } from 'socket.io-client';

let socket = null;

export const connect = (token) => {
  if (!socket) {
    socket = io({ auth: { token } });
  }
  return socket;
};

export const disconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToMessages = (callback) => {
  if (!socket) {
    console.warn('subscribeToMessages вызван до connect()');
    return;
  }
  socket.on('newMessage', callback);
};

export const unsubscribeFromMessages = (callback) => {
  if (!socket) return;
  socket.off('newMessage', callback);
};

// Новые подписки для каналов:
export const subscribeToChannels = (callbacks) => {
  if (!socket) {
    console.warn('subscribeToChannels вызван до connect()');
    return;
  }
  socket.on('newChannel', callbacks.onAdd);
  socket.on('removeChannel', callbacks.onRemove);
  socket.on('renameChannel', callbacks.onRename);
};

export const unsubscribeFromChannels = (callbacks) => {
  if (!socket) return;
  socket.off('newChannel', callbacks.onAdd);
  socket.off('removeChannel', callbacks.onRemove);
  socket.off('renameChannel', callbacks.onRename);
};
