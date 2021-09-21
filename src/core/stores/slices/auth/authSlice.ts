import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  PROPS_AUTH,
  RESPONSE_AUTH,
  PROPS_REGISTER,
  RESPONSE_REGISTER,
  PROPS_USER_ACTIVATE,
  PROPS_RESET_PASSWORD,
  PROPS_RESET_PASSWORD_CONFIRM,
  AUTH_STATE,
} from './types';
import { RootState } from '../../app/store';
import apiURL from '../share';

export const fetchAsyncLogin = createAsyncThunk(
  'auth/login',
  async (auth: PROPS_AUTH) => {
    const res = await axios.post<RESPONSE_AUTH>(
      `${apiURL}auth/jwt/create/`,
      auth,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  'auth/register',
  async (auth: PROPS_REGISTER) => {
    const res = await axios.post<RESPONSE_REGISTER>(
      `${apiURL}auth/users/`,
      auth,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncUserActivate = createAsyncThunk(
  'auth/user_activate',
  async (data: PROPS_USER_ACTIVATE) => {
    await axios.post(`${apiURL}auth/users/activation/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
);

export const fetchAsyncResetPassword = createAsyncThunk(
  'auth/reset_password',
  async (data: PROPS_RESET_PASSWORD) => {
    await axios.post(`${apiURL}auth/users/reset_password/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
);

export const fetchAsyncResetPasswordConfirm = createAsyncThunk(
  'auth/reset_password_confirm',
  async (data: PROPS_RESET_PASSWORD_CONFIRM) => {
    await axios.post(`${apiURL}auth/users/reset_password_confirm/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
);

// authSliceのinitialState
const authInitialState: AUTH_STATE = {
  isAuth: false,
  isAfterRegister: false,
  isAfterResetPassword: false,
  isLoadingAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    fetchCredStart(state) {
      // fetchが始まったとき
      state.isLoadingAuth = true;
    },
    fetchCredEnd(state) {
      // fetchが終わったとき
      state.isLoadingAuth = false;
    },
    setIsAuth(state) {
      // ユーザーが認証済みのとき
      state.isAuth = true;
    },
    resetIsAuth(state) {
      // ユーザーが認証済みでないとき
      state.isAuth = false;
    },
    setIsAfterRegister(state) {
      // ユーザー登録が終わったとき
      state.isAfterRegister = true;
    },
    resetIsAfterRegister(state) {
      state.isAfterRegister = false;
    },
    setIsAfterResetPassword(state) {
      // パスワード変更が終わったとき
      state.isAfterResetPassword = true;
    },
    resetIsAfterResetPassword(state) {
      state.isAfterResetPassword = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('ajt', action.payload.access);
      state.isAuth = true;
    });
    builder.addCase(fetchAsyncRegister.fulfilled, (state) => {
      state.isAfterRegister = true;
    });
    builder.addCase(fetchAsyncResetPassword.fulfilled, (state) => {
      state.isAfterResetPassword = true;
    });
  },
});

export const {
  fetchCredStart,
  fetchCredEnd,
  setIsAuth,
  resetIsAuth,
  setIsAfterRegister,
  resetIsAfterRegister,
  setIsAfterResetPassword,
  resetIsAfterResetPassword,
} = authSlice.actions;

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
export const selectIsLoadingAuth = (state: RootState): boolean =>
  state.auth.isLoadingAuth;
export const selectIsAfterRegister = (state: RootState): boolean =>
  state.auth.isAfterRegister;
export const selectIsAfterResetPassword = (state: RootState): boolean =>
  state.auth.isAfterResetPassword;

export default authSlice.reducer;
