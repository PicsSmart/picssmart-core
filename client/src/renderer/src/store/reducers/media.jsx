// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    media : []
}

// ==============================|| SLICE - MEDIA ||============================== //

const media = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setMedia(state, action) {
        state.media = action.payload.media;
    },
    clearMedia(state) {
      state.media = [];
    },
    addMedia(state, action) {
      state.media.push(action.payload.media);
    },
    deleteMedia(state, action) {
      state.media = state.media.filter(media => media.id !== action.payload.id);
    },
    updateMedia(state, action) {
      state.media = state.media.map(media => (media.id === action.payload.id ? {...media, ...action.payload.media }: media));
    }
  }
});

export default media.reducer;

export const { setMedia, clearMedia, addMedia, deleteMedia, updateMedia } = media.actions;
