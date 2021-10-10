import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../../app/store';
import apiURL from '../share';

import {
  PROPS_PROFILE,
  PROPS_NICKNAME,
  PROFILE,
  PROFILE_STATE,
  RESPONSE_UPDATE_PROFILE_FAILURE,
} from './types';

export const fetchAsyncGetMyProf = createAsyncThunk(
  'myprofile/get',
  async (_, { rejectWithValue }) => {
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.get<PROFILE[]>(`${apiURL}api/v1/myprofile/`, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data[0];
    }
    return rejectWithValue({
      code: 'token_not_exist',
    });
  }
);

export const fetchAsyncGetProfs = createAsyncThunk(
  'profiles/get',
  async (_, { rejectWithValue }) => {
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.get<PROFILE[]>(`${apiURL}api/v1/profile/`, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data;
    }
    return rejectWithValue({
      errorMessage: 'ログインまたはアカウントの作成を行ってください',
    });
  }
);

export const fetchAsyncCreateProf = createAsyncThunk(
  'profile/post',
  async (profile: PROPS_NICKNAME, { rejectWithValue }) => {
    const data = {
      nickname: profile.nickname,
    };
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.post<PROFILE>(`${apiURL}api/v1/profile/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data;
    }
    return rejectWithValue({
      errorMessage: 'ログインまたはアカウントの作成を行ってください',
    });
  }
);

export const fetchAsyncUpdateProf = createAsyncThunk<
  PROFILE,
  PROPS_PROFILE,
  { rejectValue: RESPONSE_UPDATE_PROFILE_FAILURE }
>('profile/put', async (profile: PROPS_PROFILE, { rejectWithValue }) => {
  const data = {
    nickname: profile.nickname,
  };
  if (typeof localStorage.ajt === 'string') {
    const res = await axios
      .put<PROFILE>(`${apiURL}api/v1/profile/${profile.id}/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.ajt}`,
        },
      })
      .then((response) => {
        const res_data: PROFILE = response.data;
        return res_data;
      })
      .catch((error: AxiosError<RESPONSE_UPDATE_PROFILE_FAILURE>) => {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      });
    return res;
  }
  return rejectWithValue({
    nickname: [],
    auth: ['ログインまたはアカウントの作成を行ってください'],
    code: '',
  });
});
// export const fetchAsyncUpdateProf = createAsyncThunk(
//   'profile/put',
//   async (profile: PROPS_PROFILE, { rejectWithValue }) => {
//     const data = {
//       nickname: profile.nickname,
//     };
//     if (typeof localStorage.ajt === 'string') {
//       const res = await axios.put<PROFILE>(
//         `${apiURL}api/v1/profile/${profile.id}/`,
//         data,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `JWT ${localStorage.ajt}`,
//           },
//         }
//       );
//       return res.data;
//     }
//     return rejectWithValue({ errorMessage: 'ログインしていません' });
//   }
// );

const profileInitialState: PROFILE_STATE = {
  isLoadingProf: false,
  openProfile: false,
  errorMessages: [],
  myprofile: {
    id: 0,
    user: '',
    nickname: '',
    created_on: '',
  },
  profiles: [
    {
      id: 0,
      user: '',
      nickname: '',
      created_on: '',
    },
  ],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: profileInitialState,
  reducers: {
    fetchProfStart(state) {
      // fetchが始まったとき
      state.isLoadingProf = true;
    },
    fetchProfEnd(state) {
      // fetchが終わったとき
      state.isLoadingProf = false;
    },
    setOpenProfile(state) {
      state.openProfile = true;
    },
    resetOpenProfile(state) {
      state.openProfile = false;
    },
    setProfileErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessages = [action.payload];
    },
    resetProfileErrorMessage(state) {
      state.errorMessages = [];
    },
    editNickname(state, action: PayloadAction<string>) {
      state.myprofile.nickname = action.payload;
    },
    resetProfile(state) {
      state.myprofile = profileInitialState.myprofile;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(fetchAsyncGetProfs.fulfilled, (state, action) => {
      state.profiles = action.payload;
    });
    builder.addCase(fetchAsyncCreateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
      state.profiles = state.profiles.map((prof) =>
        prof.id === action.payload.id ? action.payload : prof
      );
    });
    builder.addCase(fetchAsyncUpdateProf.rejected, (state, action) => {
      if (action.payload) {
        if (action.payload.nickname) {
          state.errorMessages = action.payload.nickname;
        }
      }
    });
  },
});

export const {
  fetchProfStart,
  fetchProfEnd,
  setOpenProfile,
  resetOpenProfile,
  setProfileErrorMessage,
  resetProfileErrorMessage,
  editNickname,
  resetProfile,
} = profileSlice.actions;

export const selectIsLoadingProf = (state: RootState): boolean =>
  state.profile.isLoadingProf;
export const selectOpenProfile = (state: RootState): boolean =>
  state.profile.openProfile;
export const selectProfileErrorMessages = (state: RootState): string[] =>
  state.profile.errorMessages;
export const selectMyProfile = (state: RootState): PROFILE =>
  state.profile.myprofile;
export const selectProfiles = (state: RootState): PROFILE[] =>
  state.profile.profiles;

export default profileSlice.reducer;
