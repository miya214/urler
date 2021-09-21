import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import apiURL from '../share';

import {
  PROPS_GET_POSTS,
  PROPS_CREATE_POST,
  PROPS_UPDATE_POST,
  PROPS_POST_ID,
  POST,
  POSTS,
  POST_STATE,
  PROPS_QUERY_PARAMS_GET_POSTS,
  FAVORITE_MESSAGE,
} from './types';

export const fetchAsyncGetPosts = createAsyncThunk(
  'posts/get',
  async (props: PROPS_GET_POSTS, { rejectWithValue }) => {
    let url = `${apiURL}api/v1/postlist/${props.folder}/`;
    if (props.params.url) {
      url = props.params.url;
    } else {
      url += `?ordering=${props.params.ordering}&search=${props.params.search}`;
    }
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.get<POSTS>(url, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return res.data;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

export const fetchAsyncCreatePost = createAsyncThunk(
  'post/post',
  async (post: PROPS_CREATE_POST, { rejectWithValue }) => {
    const data = {
      url: post.url,
      name: post.name,
      text: post.text,
      folder: post.folder,
    };
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.post<POST>(`${apiURL}api/v1/post/`, data, {
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

export const fetchAsyncUpdatePost = createAsyncThunk(
  'post/put',
  async (post: PROPS_UPDATE_POST, { rejectWithValue }) => {
    const data = {
      url: post.url,
      name: post.name,
      text: post.text,
      folder: post.folder,
    };
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.put<POST>(
        `${apiURL}api/v1/post/${post.id}/`,
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

export const fetchAsyncDeletePost = createAsyncThunk(
  'post/delete',
  async (id: string, { rejectWithValue }) => {
    if (typeof localStorage.ajt === 'string') {
      await axios.delete(`${apiURL}api/v1/post/${id}/`, {
        headers: {
          Authorization: `JWT ${localStorage.ajt}`,
        },
      });
      return id;
    }
    return rejectWithValue({ errorMessage: 'ログインしていません' });
  }
);

export const fetchAsyncDeleteSelectPost = createAsyncThunk(
  'post/select/delete',
  async (id_list: string[], { rejectWithValue }) => {
    if (typeof localStorage.ajt === 'string') {
      const res = await axios.post<string>(
        `${apiURL}api/v1/postdelete/`,
        id_list,
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

const postInitialState: POST_STATE = {
  isLoadingPost: false,
  isSetPost: false,
  isExistPosts: true,
  openNewPost: false,
  openEditPost: false,
  openDeletePost: false,
  posts: {
    count: 0,
    next: null,
    previous: null,
    results: [
      {
        id: '',
        url: '',
        name: '',
        text: '',
        folder: '',
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
  favorite: [];
}

const postSlice = createSlice({
  name: 'post',
  initialState: postInitialState,
  reducers: {
    fetchPostStart(state) {
      state.isLoadingPost = true;
    },
    fetchPostEnd(state) {
      state.isLoadingPost = false;
    },
    resetIsSetPost(state) {
      state.isSetPost = false;
    },
    setIsExistPosts(state) {
      state.isExistPosts = true;
    },
    resetIsExistPosts(state) {
      state.isExistPosts = false;
    },
    setOpenNewPost(state) {
      state.openNewPost = true;
    },
    resetOpenNewPost(state) {
      state.openNewPost = false;
    },
    setOpenEditPost(state) {
      state.openEditPost = true;
    },
    resetOpenEditPost(state) {
      state.openEditPost = false;
    },
    setOpenDeletePost(state) {
      state.openDeletePost = true;
    },
    resetOpenDeletePost(state) {
      state.openDeletePost = false;
    },
    resetPostsCount(state) {
      state.posts.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
      if (state.posts.count === 0) {
        state.posts = action.payload;
      } else {
        state.posts.results = state.posts.results.concat(
          action.payload.results
        );
        state.posts.next = action.payload.next;
        state.posts.previous = action.payload.previous;
      }
      if (action.payload.count === 0) {
        state.isExistPosts = false;
      } else if (action.payload.count > 0) {
        state.isExistPosts = true;
      }
    });
    builder.addCase(fetchAsyncCreatePost.fulfilled, (state, action) => {
      state.posts.results.unshift(action.payload);
    });
    builder.addCase(fetchAsyncUpdatePost.fulfilled, (state, action) => {
      state.posts.results = state.posts.results.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    });
    builder.addCase(fetchAsyncDeletePost.fulfilled, (state, action) => {
      state.posts.results = state.posts.results.filter(
        (post) => post.id !== action.payload
      );
    });
  },
});

export const {
  fetchPostStart,
  fetchPostEnd,
  resetIsSetPost,
  resetPostsCount,
  setIsExistPosts,
  resetIsExistPosts,
  setOpenNewPost,
  resetOpenNewPost,
  setOpenEditPost,
  resetOpenEditPost,
  setOpenDeletePost,
  resetOpenDeletePost,
} = postSlice.actions;

export const selectIsLoadingPost = (state: RootState): boolean =>
  state.post.isLoadingPost;
export const selectIsExistPosts = (state: RootState): boolean =>
  state.post.isExistPosts;
export const selectIsSetPost = (state: RootState): boolean =>
  state.post.isSetPost;
export const selectPosts = (state: RootState): POSTS => state.post.posts;
export const selectOpenDeletePost = (state: RootState): boolean =>
  state.post.openDeletePost;
export const selectOpenNewPost = (state: RootState): boolean =>
  state.post.openNewPost;
export const selectOpenEditPost = (state: RootState): boolean =>
  state.post.openEditPost;

export default postSlice.reducer;
