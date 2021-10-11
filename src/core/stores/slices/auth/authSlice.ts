import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  PROPS_AUTH,
  RESPONSE_AUTH,
  PROPS_REGISTER,
  PROPS_USER_ACTIVATE,
  PROPS_RESET_PASSWORD,
  PROPS_RESET_PASSWORD_CONFIRM,
  AUTH_STATE,
  RESPONSE_REGISTER_SUCCESS,
  RESPONSE_REGISTER_FAILURE,
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

export const fetchAsyncRegister = createAsyncThunk<
  RESPONSE_REGISTER_SUCCESS,
  PROPS_REGISTER,
  { rejectValue: RESPONSE_REGISTER_FAILURE }
>('auth/register', async (data: PROPS_REGISTER, { rejectWithValue }) => {
  const res = await axios
    .post<RESPONSE_REGISTER_SUCCESS>(`${apiURL}auth/users/`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const res_data: RESPONSE_REGISTER_SUCCESS = response.data;
      return res_data;
    })
    .catch((error: AxiosError<RESPONSE_REGISTER_FAILURE>) => {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    });

  return res;
});

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
  isUserActive: false,
  isAfterRegister: false,
  isAfterResetPassword: false,
  isLoadingAuth: false,
  errorMessages: [],
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
    setAuthErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessages = [action.payload];
    },
    resetAuthErrorMessage(state) {
      state.errorMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('ajt', action.payload.access);
      state.isAuth = true;
    });
    builder.addCase(fetchAsyncLogin.rejected, (state) => {
      state.errorMessages = [
        'メールアドレスまたはパスワードが間違っています。',
      ];
    });
    builder.addCase(fetchAsyncRegister.fulfilled, (state) => {
      state.isAfterRegister = true;
    });
    builder.addCase(fetchAsyncRegister.rejected, (state, action) => {
      if (action.payload) {
        if (action.payload.email) {
          state.errorMessages = action.payload.email;
        } else if (action.payload.password) {
          state.errorMessages = action.payload.password;
        } else if (action.payload.re_password) {
          state.errorMessages = action.payload.re_password;
        }
      }
    });
    builder.addCase(fetchAsyncResetPassword.fulfilled, (state) => {
      state.isAfterResetPassword = true;
    });
    builder.addCase(fetchAsyncResetPassword.rejected, (state) => {
      state.errorMessages = ['指定したメールアドレスのユーザーが存在しません'];
    });
    builder.addCase(fetchAsyncResetPasswordConfirm.rejected, (state) => {
      state.errorMessages = ['このURLからパスワードを変更できません'];
    });
    builder.addCase(fetchAsyncUserActivate.fulfilled, (state) => {
      state.isUserActive = true;
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
  setAuthErrorMessage,
  resetAuthErrorMessage,
} = authSlice.actions;

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
export const selectIsUserActive = (state: RootState): boolean =>
  state.auth.isUserActive;
export const selectIsLoadingAuth = (state: RootState): boolean =>
  state.auth.isLoadingAuth;
export const selectIsAfterRegister = (state: RootState): boolean =>
  state.auth.isAfterRegister;
export const selectIsAfterResetPassword = (state: RootState): boolean =>
  state.auth.isAfterResetPassword;
export const selectAuthErrorMessage = (state: RootState): string[] =>
  state.auth.errorMessages;

export default authSlice.reducer;
