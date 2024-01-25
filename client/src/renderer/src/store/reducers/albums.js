// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    albums : []
}

// ==============================|| SLICE - MEDIA ||============================== //

const albums = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums(state, action) {
      state.albums = action.payload.albums;
    },
    clearAlbums(state) {
      state.albums = [];
    },
    addAlbum(state, action) {
      state.albums.push(action.payload.album);
    },
    deleteAlbum(state, action) {
      state.albums = state.albums.filter(album => album.id !== action.payload.id);
    }
  }
});

export default albums.reducer;

export const { setAlbums, clearAlbums, addAlbum, deleteAlbum } = albums.actions;
