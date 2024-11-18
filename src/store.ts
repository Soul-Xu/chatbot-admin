// store.js
import { configureStore } from '@reduxjs/toolkit';

import currentUrlReducer from './feature/currentUrl/currentUrlSlice';

export const store = configureStore({
  reducer: {
    currentUrl: currentUrlReducer,
  },
});
