import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { MESSAGE_STATE } from './types';

const messageInitialState: MESSAGE_STATE = {
  infoMessage: '',
  errorMessage: '',
  isExistInfoMessage: false,
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
    setIsExistInfoMessage(state) {
      state.isExistInfoMessage = true;
    },
    resetIsExistInfoMessage(state) {
      state.isExistInfoMessage = false;
    },
  },
});

export const {
  setInfoMessage,
  resetInfoMessage,
  setErrorMessage,
  resetErrorMessage,
  setIsExistInfoMessage,
  resetIsExistInfoMessage,
} = messageSlice.actions;

export const selectIsExistMessage = (state: RootState): boolean =>
  state.message.isExistInfoMessage;
export const selectInfoMessage = (state: RootState): string =>
  state.message.infoMessage;
export const selectErrorMessage = (state: RootState): string =>
  state.message.errorMessage;
export default messageSlice.reducer;
