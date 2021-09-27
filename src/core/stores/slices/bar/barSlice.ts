import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { BAR_STATE } from './types';

const barInitialState: BAR_STATE = {
  activeIndex: 0,
};

const barSlice = createSlice({
  name: 'bar',
  initialState: barInitialState,
  reducers: {
    setActiveIndex(state, action: PayloadAction<number>) {
      state.activeIndex = action.payload;
    },
    resetActiveIndex(state) {
      state.activeIndex = 0;
    },
  },
});

export const { setActiveIndex, resetActiveIndex } = barSlice.actions;

export const selectActiveIndex = (state: RootState): number =>
  state.bar.activeIndex;

export default barSlice.reducer;
