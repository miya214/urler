import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { MESSAGE_STATE } from './types';

const messageInitialState: MESSAGE_STATE = {
  infoMessage: '',
  errorMessage: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState: messageInitialState,
  reducers: {
    setInfoMessage(state, action: PayloadAction<string>) {
      state.infoMessage = action.payload;
    },
    resetInfoMessage(state) {
      state.infoMessage = '';
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    resetErrorMessage(state) {
      state.errorMessage = '';
    },
  },
});

export const {
  setInfoMessage,
  resetInfoMessage,
  setErrorMessage,
  resetErrorMessage,
} = messageSlice.actions;

export const selectInfoMessage = (state: RootState): string =>
  state.message.infoMessage;
export const selectErrorMessage = (state: RootState): string =>
  state.message.errorMessage;

export default messageSlice.reducer;
