import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import apiURL from '../share';

import { PROPS_PROFILE, PROPS_NICKNAME, PROFILE, PROFILE_STATE } from './types';

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
    return rejectWithValue({ errorMessage: 'ログインしていません' });
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
    return rejectWithValue({ errorMessage: 'ログインしていません' });
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
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

export const fetchAsyncUpdateProf = createAsyncThunk(
  'profile/put',
  async (profile: PROPS_PROFILE, { rejectWithValue }) => {
    const data = {
      nickname: profile.nickname,
    };
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.put<PROFILE>(
        `${apiURL}api/v1/profile/${profile.id}/`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.ajt}`,
          },
        }
      );
      return res.data;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

const profileInitialState: PROFILE_STATE = {
  isLoadingProf: false,
  openProfile: false,
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
  },
});

export const {
  fetchProfStart,
  fetchProfEnd,
  setOpenProfile,
  resetOpenProfile,
  editNickname,
  resetProfile,
} = profileSlice.actions;

export const selectIsLoadingProf = (state: RootState): boolean =>
  state.profile.isLoadingProf;
export const selectOpenProfile = (state: RootState): boolean =>
  state.profile.openProfile;
export const selectMyProfile = (state: RootState): PROFILE =>
  state.profile.myprofile;
export const selectProfiles = (state: RootState): PROFILE[] =>
  state.profile.profiles;

export default profileSlice.reducer;
