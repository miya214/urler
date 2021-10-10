import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
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
  RESPONSE_CREATE_FOLDER_FAILURE,
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
  async (_, { rejectWithValue }) => {
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.get<FOLDER[]>(`${apiURL}api/v1/myfolder/`, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);
// export const fetchAsyncGetMyFolders = createAsyncThunk(
//   'myfolders/get',
//   async (params: PROPS_QUERY_PARAMS_GET_MYFOLDERS, { rejectWithValue }) => {
//     let url = `${apiURL}api/v1/myfolder/`;
//     if (params.url) {
//       url = params.url;
//     } else {
//       url += `?ordering=${params.ordering}&public=${params.public}&search=${params.search}`;
//     }
//     if (typeof localStorage.ajt === 'string') {
//       const res = await axios.get<FOLDERS>(url, {
//         headers: {
//           Authorization: `JWT ${localStorage.ajt}`,
//         },
//       });
//       return res.data;
//     }
//     return rejectWithValue({ errorMessage: 'ログインしていません' });
//   }
// );

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

export const fetchAsyncCreateFolder = createAsyncThunk<
  FOLDER,
  PROPS_CREATE_FOLDER,
  { rejectValue: RESPONSE_CREATE_FOLDER_FAILURE }
>('folder/post', async (folder: PROPS_CREATE_FOLDER, { rejectWithValue }) => {
  const data = {
    name: folder.name,
    public: folder.public,
  };
  if (typeof localStorage.ajt === 'string') {
    const res = await axios
      .post<FOLDER>(`${apiURL}api/v1/folder/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.ajt}`,
        },
      })
      .then((response) => {
        const res_data: FOLDER = response.data;
        return res_data;
      })
      .catch((error: AxiosError<RESPONSE_CREATE_FOLDER_FAILURE>) => {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      });
    return res;
  }
  return rejectWithValue({
    name: [],
    auth: ['ログインまたはアカウントの作成を行ってください'],
    code: '',
  });
});
// export const fetchAsyncCreateFolder = createAsyncThunk(
//   'folder/post',
//   async (folder: PROPS_CREATE_FOLDER, { rejectWithValue }) => {
//     const data = {
//       name: folder.name,
//       public: folder.public,
//     };
//     if (typeof localStorage.ajt === 'string') {
//       const res = await axios.post<FOLDER>(`${apiURL}api/v1/folder/`, data, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `JWT ${localStorage.ajt}`,
//         },
//       });
//       return res.data;
//     }
//     return rejectWithValue({ errorMessage: 'ログインしていません' });
//   }
// );

export const fetchAsyncUpdateFolder = createAsyncThunk<
  FOLDER,
  PROPS_UPDATE_FOLDER,
  { rejectValue: RESPONSE_CREATE_FOLDER_FAILURE }
>('folder/put', async (folder: PROPS_UPDATE_FOLDER, { rejectWithValue }) => {
  const data = {
    name: folder.name,
    public: folder.public,
  };
  if (typeof localStorage.ajt === 'string') {
    const res = await axios
      .put<FOLDER>(`${apiURL}api/v1/folder/${folder.id}/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.ajt}`,
        },
      })
      .then((response) => {
        const res_data: FOLDER = response.data;
        return res_data;
      })
      .catch((error: AxiosError<RESPONSE_CREATE_FOLDER_FAILURE>) => {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      });
    return res;
  }
  return rejectWithValue({
    name: [],
    auth: ['ログインまたはアカウントの作成を行ってください'],
    code: '',
  });
});

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
  numOfFavorite: 0,
  errorMessages: [],
  folder: {
    id: '',
    user: '',
    name: '',
    public: false,
    posts_add: '',
    favorite: [],
  },
  myfolders: [
    {
      id: '',
      user: '',
      name: '',
      public: false,
      posts_add: '',
      favorite: [],
    },
  ],

  // myfolders: {
  //   count: 0,
  //   next: null,
  //   previous: null,
  //   results: [
  //     {
  //       id: '',
  //       user: '',
  //       name: '',
  //       public: false,
  //       posts_add: '',
  //       favorite: [],
  //     },
  //   ],
  // },

  // 追加
  myfoldersSearchResult: [],
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
      state.myfolders = [];
      // 追加
      state.myfoldersSearchResult = [];
    },
    // resetMyFoldersCount(state) {
    //   state.myfolders.count = 0;
    // },
    resetFoldersCount(state) {
      state.folders.count = 0;
    },
    resetFavoriteFoldersCount(state) {
      state.favoritefolders.count = 0;
    },
    setFolderErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessages = [action.payload];
    },
    resetFolderErrorMessage(state) {
      state.errorMessages = [];
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
    searchMyFolders(
      state,
      action: PayloadAction<PROPS_QUERY_PARAMS_GET_MYFOLDERS>
    ) {
      const folders = state.myfolders.concat();
      let folders_sort = folders;
      if (action.payload.ordering === 'posts_add') {
        folders_sort = folders.reverse();
      }

      state.myfoldersSearchResult = folders_sort.filter((folder) => {
        if (folder.name.includes(action.payload.search)) {
          if (action.payload.public === '') {
            return true;
          }
          if (String(folder.public) === action.payload.public) {
            return true;
          }
        }
        return false;
      });
      if (state.myfoldersSearchResult.length === 0) {
        state.hasMyFolder = false;
      }
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
      state.myfolders = action.payload;
      state.myfoldersSearchResult = action.payload;
      if (action.payload.length === 0) {
        state.hasMyFolder = false;
      }
      let favoriteNum = 0;
      state.myfolders.forEach((folder) => {
        favoriteNum += folder.favorite.length;
      });
      state.numOfFavorite = favoriteNum;
    });
    // builder.addCase(fetchAsyncGetMyFolders.fulfilled, (state, action) => {
    //   if (state.myfolders.count === 0) {
    //     state.myfolders = action.payload;
    //   } else {
    //     state.myfolders.results = state.myfolders.results.concat(
    //       action.payload.results
    //     );
    //     state.myfolders.next = action.payload.next;
    //     state.myfolders.previous = action.payload.previous;
    //   }
    //   if (action.payload.count === 0) {
    //     state.hasMyFolder = false;
    //   }
    // });
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
      state.myfolders.unshift(action.payload);
      state.myfoldersSearchResult = state.myfolders;
      state.hasMyFolder = true;
    });
    builder.addCase(fetchAsyncCreateFolder.rejected, (state, action) => {
      if (action.payload) {
        if (action.payload.name) {
          state.errorMessages = action.payload.name;
        }
      }
    });
    // builder.addCase(fetchAsyncCreateFolder.fulfilled, (state, action) => {
    //   state.myfolders.results.unshift(action.payload);
    // });
    builder.addCase(fetchAsyncUpdateFolder.fulfilled, (state, action) => {
      state.folder = action.payload;
      state.myfolders = state.myfolders.map((folder) =>
        folder.id === action.payload.id ? action.payload : folder
      );
      state.myfoldersSearchResult = state.myfolders;
    });
    builder.addCase(fetchAsyncUpdateFolder.rejected, (state, action) => {
      if (action.payload) {
        if (action.payload.name) {
          state.errorMessages = action.payload.name;
        }
      }
    });
    // builder.addCase(fetchAsyncUpdateFolder.fulfilled, (state, action) => {
    //   state.folder = action.payload;
    //   state.myfolders.results = state.myfolders.results.map((folder) =>
    //     folder.id === action.payload.id ? action.payload : folder
    //   );
    // });
    builder.addCase(fetchAsyncDeleteFolder.fulfilled, (state, action) => {
      state.myfolders = state.myfolders.filter(
        (folder) => folder.id !== action.payload
      );
      state.folders.results = state.folders.results.filter(
        (folder) => folder.id !== action.payload
      );
      state.favoritefolders.results = state.favoritefolders.results.filter(
        (result) => result.folder.id !== action.payload
      );
      state.myfoldersSearchResult = state.myfolders;
      if (state.myfolders.length === 0) {
        state.hasMyFolder = false;
      }
    });
    // builder.addCase(fetchAsyncDeleteFolder.fulfilled, (state, action) => {
    //   state.myfolders.results = state.myfolders.results.filter(
    //     (folder) => folder.id !== action.payload
    //   );
    // });
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
  setFolderErrorMessage,
  resetFolderErrorMessage,
  setHasMyFolder,
  resetHasMyFolder,
  setOpenNewFolder,
  resetOpenNewFolder,
  setOpenEditFolder,
  resetOpenEditFolder,
  setOpenDeleteFolder,
  resetOpenDeleteFolder,
  setFolder,
  searchMyFolders,
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
export const selectNumOfFavorite = (state: RootState): number =>
  state.folder.numOfFavorite;
export const selectFolderErrorMessages = (state: RootState): string[] =>
  state.folder.errorMessages;
export const selectMyFolders = (state: RootState): FOLDER[] =>
  state.folder.myfolders;
// 追加
export const selectMyFoldersSearchResult = (state: RootState): FOLDER[] =>
  state.folder.myfoldersSearchResult;
// export const selectMyFolders = (state: RootState): FOLDERS =>
//   state.folder.myfolders;
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
