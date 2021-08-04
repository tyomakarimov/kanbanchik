import { configureStore } from '@reduxjs/toolkit';

import authSlice from './Authentication/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const actions = authSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;
