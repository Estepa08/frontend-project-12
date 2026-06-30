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
    console.warn('subscribeToMessages вызван до connect() — подписка не выполнена');
    return;
  }
  socket.on('newMessage', callback);
};

export const unsubscribeFromMessages = (callback) => {
  if(!socket) {
    console.warn('unsubscribeFromMessages вызван до connect() — отписка не выполнена');
    return;
  }
  socket.off('newMessage', callback);
};