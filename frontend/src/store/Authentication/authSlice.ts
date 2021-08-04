import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logIn(state: AuthState, action: PayloadAction<string>) {
      state.user = action.payload;
      state.authenticated = true;
    },
    logOut(state: AuthState) {
      state.user = null;
      state.authenticated = false;
    },
  },
});

export default authSlice;
