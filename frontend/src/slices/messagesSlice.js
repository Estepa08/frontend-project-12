// frontend/src/slices/messagesSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addOptimisticMessage: (state, action) => {
      const { tempId, body, channelId, username } = action.payload;
      state.items.push({
        tempId,
        body,
        channelId,
        username,
        status: 'pending',
      });
    },

    confirmMessage: (state, action) => {
      const { tempId, realMessage } = action.payload;
      const index = state.items.findIndex((msg) => msg.tempId === tempId);
      if (index !== -1) {
        state.items[index] = { ...realMessage, status: 'sent' };
      }
    },

    failMessage: (state, action) => {
      const { tempId } = action.payload;
      const index = state.items.findIndex((msg) => msg.tempId === tempId);
      if (index !== -1) {
        state.items[index].status = 'failed';
      }
    },

    addMessage: (state, action) => {
      const incoming = action.payload;
      const index = state.items.findIndex(
        (msg) =>
          (incoming.id && msg.id === incoming.id) ||
          (incoming.tempId && msg.tempId === incoming.tempId)
      );

      if (index !== -1) {
        state.items[index] = { ...incoming, status: 'sent' };
      } else {
        state.items.push({ ...incoming, status: 'sent' });
      }
    },
    removeMessagesByChannel: (state, action) => {
      state.items = state.items.filter((msg) => msg.channelId !== action.payload);
    },
  },
});

export const {
  addOptimisticMessage,
  confirmMessage,
  failMessage,
  addMessage,
  removeMessagesByChannel,
} = messagesSlice.actions;
export default messagesSlice.reducer;

// Селекторы
const selectAllMessages = (state) => state.messages.items;
const selectChannelIdParam = (state, channelId) => channelId;

export const selectMessagesByChannel = createSelector(
  [selectAllMessages, selectChannelIdParam],
  (items, channelId) => items.filter((msg) => msg.channelId === channelId)
);
