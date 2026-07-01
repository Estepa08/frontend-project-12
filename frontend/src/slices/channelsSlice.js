// frontend/src/slices/channelsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = '1';

const initialState = {
  channels: [],
  activeChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
      if (!state.activeChannelId && action.payload.length > 0) {
        const general = action.payload.find((c) => c.name === 'general' || c.name === 'General');
        state.activeChannelId = general ? general.id : action.payload[0].id;
      }
    },
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
    // Socket-событие: кто-то создал новый канал
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    // Socket-событие: кто-то удалил канал
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((c) => c.id !== id);
      // Если удалили активный канал — переключаем на General
      if (state.activeChannelId === id) {
        const general = state.channels.find((c) => c.name === 'general' || c.name === 'General');
        state.activeChannelId = general ? general.id : (state.channels[0]?.id ?? null);
      }
    },
    // Socket-событие: кто-то переименовал канал
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (channel) channel.name = name;
    },
  },
});

export const { setChannels, setActiveChannel, addChannel, removeChannel, renameChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;

export const selectChannels = (state) => state.channels.channels;
export const selectActiveChannelId = (state) => state.channels.activeChannelId;
export const selectActiveChannel = (state) =>
  state.channels.channels.find((c) => c.id === state.channels.activeChannelId);
export { DEFAULT_CHANNEL_ID };
