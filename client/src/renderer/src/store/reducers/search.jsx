// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    caption : ''
}

// ==============================|| SLICE - MEDIA ||============================== //

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) {
        state.caption = action.payload.caption;
    }
  }
});

export default search.reducer;

export const { setSearch } = search.actions;
