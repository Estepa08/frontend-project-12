// frontend/src/slices/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: {
    1: [], // General
  },
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { channelId, text, username } = action.payload;

      if (!state.messages[channelId]) {
        state.messages[channelId] = [];
      }

      state.messages[channelId].push({
        id: Date.now(),
        username: username || 'Пользователь',
        text: text,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isSelf: true,
      });
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;

// Селекторы
export const selectMessagesByChannel = (state, channelId) => {
  return state.messages.messages[channelId] || [];
};
