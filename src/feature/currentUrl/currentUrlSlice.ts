// features/currentUrl/currentUrlSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const currentUrlSlice = createSlice({
  name: 'currentUrl',
  initialState: '',
  reducers: {
    setCurrentUrl: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrentUrl } = currentUrlSlice.actions;

export default currentUrlSlice.reducer;
