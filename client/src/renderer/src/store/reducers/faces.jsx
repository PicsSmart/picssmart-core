// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    faces : []
}

// ==============================|| SLICE - MEDIA ||============================== //

const faces = createSlice({
  name: 'faces',
  initialState,
  reducers: {
    setFaces(state, action) {
        state.faces = action.payload.faces;
    },
    clearFaces(state) {
      state.faces = [];
    },
    addFaces(state, action) {
      state.faces.push(action.payload.faces);
    },
    deleteFaces(state, action) {
      state.faces = state.faces.filter(face => face._id !== action.payload.id);
    }
  }
});

export default faces.reducer;

export const { setFaces, clearFaces, addFaces, deleteFaces } = faces.actions;
