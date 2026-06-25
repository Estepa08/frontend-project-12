// frontend/src/slices/channelsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [{ id: 1, name: 'General' }],
  activeChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
});

export default channelsSlice.reducer;

// Селекторы
export const selectChannels = (state) => state.channels.channels;
export const selectActiveChannelId = (state) => state.channels.activeChannelId;
export const selectActiveChannel = (state) => {
  return state.channels.channels.find((c) => c.id === state.channels.activeChannelId);
};
