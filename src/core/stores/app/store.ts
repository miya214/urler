import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/authSlice';
import profileReducer from '../slices/profile/profileSlice';
import folderReducer from '../slices/folder/folderSlice';
import postReducer from '../slices/post/postSlice';
import messageReducer from '../slices/message/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    message: messageReducer,
    folder: folderReducer,
    post: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
