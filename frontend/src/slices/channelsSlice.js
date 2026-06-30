// frontend/src/slices/channelsSlice.js
import { createSlice } from '@reduxjs/toolkit';

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
      // Если активный канал ещё не выбран — выбираем General по умолчанию
      if (!state.activeChannelId && action.payload.length > 0) {
        const general = action.payload.find((c) => c.name === 'general' || c.name === 'General');
        state.activeChannelId = general ? general.id : action.payload[0].id;
      }
    },
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
});

export const { setChannels, setActiveChannel } = channelsSlice.actions;
export default channelsSlice.reducer;

// Селекторы
export const selectChannels = (state) => state.channels.channels;
export const selectActiveChannelId = (state) => state.channels.activeChannelId;
export const selectActiveChannel = (state) =>
  state.channels.channels.find((c) => c.id === state.channels.activeChannelId);
