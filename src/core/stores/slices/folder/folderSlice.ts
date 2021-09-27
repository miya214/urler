import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import apiURL from '../share';

import {
  PROPS_CREATE_FOLDER,
  PROPS_UPDATE_FOLDER,
  PROPS_FOLDER_ID,
  FOLDER,
  FOLDERS,
  FOLDER_WITHOUT_FAVORITE,
  FOLDERS_WITHOUT_FAVORITE,
  FOLDER_STATE,
  PROPS_QUERY_PARAMS_GET_FOLDERS,
  PROPS_QUERY_PARAMS_GET_MYFOLDERS,
  RESPONSE_POST_FAVORITE,
} from './types';

export const fetchAsyncGetFolder = createAsyncThunk(
  'folder/get',
  async (id: string, { rejectWithValue }) => {
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.get<FOLDER>(`${apiURL}api/v1/folder/${id}/`, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

export const fetchAsyncGetMyFolders = createAsyncThunk(
  'myfolders/get',
  async (params: PROPS_QUERY_PARAMS_GET_MYFOLDERS, { rejectWithValue }) => {
    let url = `${apiURL}api/v1/myfolder/`;
    if (params.url) {
      url = params.url;
    } else {
      url += `?ordering=${params.ordering}&public=${params.public}&search=${params.search}`;
    }
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.get<FOLDERS>(url, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

export const fetchAsyncGetFolders = createAsyncThunk(
  'folders/get',
  async (params: PROPS_QUERY_PARAMS_GET_FOLDERS, { rejectWithValue }) => {
    let url = `${apiURL}api/v1/folderlist/`;
    if (params.url) {
      url = params.url;
    } else {
      url += `?ordering=${params.ordering}&search=${params.search}`;
    }
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.get<FOLDERS>(url, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

export const fetchAsyncGetFavoriteFolders = createAsyncThunk(
  'favoritefolders/get',
  async (params: PROPS_QUERY_PARAMS_GET_FOLDERS, { rejectWithValue }) => {
    let url = `${apiURL}api/v1/folderlist/favorite/`;
    if (params.url) {
      url = params.url;
    } else {
      url += `?ordering=${params.ordering}&search=${params.search}`;
    }
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.get<FOLDERS_WITHOUT_FAVORITE>(url, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

export const fetchAsyncCreateFolder = createAsyncThunk(
  'folder/post',
  async (folder: PROPS_CREATE_FOLDER, { rejectWithValue }) => {
    const data = {
      name: folder.name,
      public: folder.public,
    };
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.post<FOLDER>(`${apiURL}api/v1/folder/`, data, {
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

export const fetchAsyncUpdateFolder = createAsyncThunk(
  'folder/put',
  async (folder: PROPS_UPDATE_FOLDER, { rejectWithValue }) => {
    const data = {
      name: folder.name,
      public: folder.public,
    };
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.put<FOLDER>(
        `${apiURL}api/v1/folder/${folder.id}/`,
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

export const fetchAsyncDeleteFolder = createAsyncThunk(
  'folder/delete',
  async (folder: PROPS_FOLDER_ID, { rejectWithValue }) => {
    if (typeof localStorage.ajt === 'string') {
      await axios.delete(`${apiURL}api/v1/folder/${folder.id}/`, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return folder.id;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

export const fetchAsyncPostFavorite = createAsyncThunk(
  'favorite/post',
  async (id: string, { rejectWithValue }) => {
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.post<RESPONSE_POST_FAVORITE>(
        `${apiURL}api/v1/favorite/${id}/`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.ajt}`,
          },
        }
      );
      return res.data;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

const folderInitialState: FOLDER_STATE = {
  isLoadingFolder: false,
  isLoadingFavorite: false,
  isSetFolder: false,
  hasMyFolder: true,
  isExistFolders: true,
  isExistFavoriteFolders: true,
  openNewFolder: false,
  openEditFolder: false,
  openDeleteFolder: false,
  folder: {
    id: '',
    user: '',
    name: '',
    public: false,
    posts_add: '',
    favorite: [],
  },
  myfolders: {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: '',
        user: '',
        name: '',
        public: false,
        posts_add: '',
        favorite: [],
      },
    ],
  },
  folders: {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: '',
        user: '',
        name: '',
        public: false,
        posts_add: '',
        favorite: [],
      },
    ],
  },
  favoritefolders: {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        folder: {
          id: '',
          user: '',
          name: '',
          public: false,
          posts_add: '',
        },
      },
    ],
  },
};

interface PROPS_SET_FOLDER {
  id: string;
  user: string;
  name: string;
  public: boolean;
  posts_add: string;
  favorite: string[];
}

const folderSlice = createSlice({
  name: 'folder',
  initialState: folderInitialState,
  reducers: {
    fetchFolderStart(state) {
      state.isLoadingFolder = true;
    },
    fetchFolderEnd(state) {
      state.isLoadingFolder = false;
    },
    fetchFavoriteStart(state) {
      state.isLoadingFavorite = true;
    },
    fetchFavoriteEnd(state) {
      state.isLoadingFavorite = false;
    },
    setIsSetFolder(state) {
      state.isSetFolder = true;
    },
    resetIsSetFolder(state) {
      state.isSetFolder = false;
    },
    setIsExistFolders(state) {
      state.isExistFolders = true;
    },
    resetIsExistFolders(state) {
      state.isExistFolders = false;
    },
    setIsExistFavoriteFolders(state) {
      state.isExistFavoriteFolders = true;
    },
    resetIsExistFavoriteFolders(state) {
      state.isExistFavoriteFolders = false;
    },
    setHasMyFolder(state) {
      state.hasMyFolder = true;
    },
    resetHasMyFolder(state) {
      state.hasMyFolder = false;
    },
    setOpenNewFolder(state) {
      state.openNewFolder = true;
    },
    resetOpenNewFolder(state) {
      state.openNewFolder = false;
    },
    setOpenEditFolder(state) {
      state.openEditFolder = true;
    },
    resetOpenEditFolder(state) {
      state.openEditFolder = false;
    },
    setOpenDeleteFolder(state) {
      state.openDeleteFolder = true;
    },
    resetOpenDeleteFolder(state) {
      state.openDeleteFolder = false;
    },
    resetMyFoldersCount(state) {
      state.myfolders.count = 0;
    },
    resetFoldersCount(state) {
      state.folders.count = 0;
    },
    resetFavoriteFoldersCount(state) {
      state.favoritefolders.count = 0;
    },
    setFolder(state, action: PayloadAction<PROPS_SET_FOLDER>) {
      state.folder = {
        id: action.payload.id,
        user: action.payload.user,
        name: action.payload.name,
        public: action.payload.public,
        posts_add: action.payload.posts_add,
        favorite: action.payload.favorite,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetFolder.fulfilled, (state, action) => {
      state.folder = action.payload;
    });
    builder.addCase(fetchAsyncGetFolders.fulfilled, (state, action) => {
      if (state.folders.count === 0) {
        state.folders = action.payload;
      } else {
        state.folders.results = state.folders.results.concat(
          action.payload.results
        );
        state.folders.next = action.payload.next;
        state.folders.previous = action.payload.previous;
      }
      if (action.payload.count === 0) {
        state.isExistFolders = false;
      }
    });
    builder.addCase(fetchAsyncGetMyFolders.fulfilled, (state, action) => {
      if (state.myfolders.count === 0) {
        state.myfolders = action.payload;
      } else {
        state.myfolders.results = state.myfolders.results.concat(
          action.payload.results
        );
        state.myfolders.next = action.payload.next;
        state.myfolders.previous = action.payload.previous;
      }
      if (action.payload.count === 0) {
        state.hasMyFolder = false;
      }
    });
    builder.addCase(fetchAsyncGetFavoriteFolders.fulfilled, (state, action) => {
      if (state.favoritefolders.count === 0) {
        state.favoritefolders = action.payload;
      } else {
        state.favoritefolders.results = state.favoritefolders.results.concat(
          action.payload.results
        );
        state.favoritefolders.next = action.payload.next;
        state.favoritefolders.previous = action.payload.previous;
      }
      if (action.payload.count === 0) {
        state.isExistFavoriteFolders = false;
      }
    });
    builder.addCase(fetchAsyncCreateFolder.fulfilled, (state, action) => {
      state.myfolders.results.unshift(action.payload);
    });
    builder.addCase(fetchAsyncUpdateFolder.fulfilled, (state, action) => {
      state.folder = action.payload;
      state.myfolders.results = state.myfolders.results.map((folder) =>
        folder.id === action.payload.id ? action.payload : folder
      );
    });
    builder.addCase(fetchAsyncDeleteFolder.fulfilled, (state, action) => {
      state.myfolders.results = state.myfolders.results.filter(
        (folder) => folder.id !== action.payload
      );
    });
    builder.addCase(fetchAsyncPostFavorite.fulfilled, (state, action) => {
      const currentfolder = state.folder;
      const folderWithoutFavorite = {
        folder: {
          id: currentfolder.id,
          user: currentfolder.user,
          name: currentfolder.name,
          public: currentfolder.public,
          posts_add: currentfolder.posts_add,
        },
      };
      if (state.favoritefolders.count !== 0) {
        if (action.payload.isFavorite) {
          state.favoritefolders.count += 1;
          state.favoritefolders.results.unshift(folderWithoutFavorite);
        } else {
          state.favoritefolders.count -= 1;
          state.favoritefolders.results = state.favoritefolders.results.filter(
            (result) => result.folder.id !== currentfolder.id
          );
        }
      }
    });
  },
});

export const {
  fetchFolderStart,
  fetchFolderEnd,
  fetchFavoriteStart,
  fetchFavoriteEnd,
  resetIsSetFolder,
  resetFoldersCount,
  resetMyFoldersCount,
  resetFavoriteFoldersCount,
  setIsExistFolders,
  resetIsExistFolders,
  setIsExistFavoriteFolders,
  resetIsExistFavoriteFolders,
  setHasMyFolder,
  resetHasMyFolder,
  setOpenNewFolder,
  resetOpenNewFolder,
  setOpenEditFolder,
  resetOpenEditFolder,
  setOpenDeleteFolder,
  resetOpenDeleteFolder,
  setFolder,
} = folderSlice.actions;

export const selectIsLoadingFolder = (state: RootState): boolean =>
  state.folder.isLoadingFolder;
export const selectHasMyFolder = (state: RootState): boolean =>
  state.folder.hasMyFolder;
export const selectIsExistFolders = (state: RootState): boolean =>
  state.folder.isExistFolders;
export const selectIsExistFavoriteFolders = (state: RootState): boolean =>
  state.folder.isExistFavoriteFolders;
export const selectIsLoadingFavorite = (state: RootState): boolean =>
  state.folder.isLoadingFavorite;
export const selectIsSetFolder = (state: RootState): boolean =>
  state.folder.isSetFolder;
export const selectMyFolders = (state: RootState): FOLDERS =>
  state.folder.myfolders;
export const selectFolders = (state: RootState): FOLDERS =>
  state.folder.folders;
export const selectFavoriteFolders = (
  state: RootState
): FOLDERS_WITHOUT_FAVORITE => state.folder.favoritefolders;
export const selectOpenDeleteFolder = (state: RootState): boolean =>
  state.folder.openDeleteFolder;
export const selectOpenNewFolder = (state: RootState): boolean =>
  state.folder.openNewFolder;
export const selectOpenEditFolder = (state: RootState): boolean =>
  state.folder.openEditFolder;

export const selectFolder = (state: RootState): FOLDER => state.folder.folder;

export default folderSlice.reducer;
