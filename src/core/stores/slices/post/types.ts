export interface PROPS_CREATE_POST {
  url: string;
  name: string;
  text: string;
  folder: string;
}

export interface PROPS_UPDATE_POST {
  id: string;
  url: string;
  name: string;
  text: string;
  folder: string;
}

export interface PROPS_POST_ID {
  id: string;
}

export interface POST {
  id: string;
  url: string;
  name: string;
  text: string;
  folder: string;
}

export interface POSTS {
  count: number;
  next: null | string;
  previous: null | string;
  results: POST[];
}

export interface POST_STATE {
  isLoadingPost: boolean;
  isSetPost: boolean;
  isExistPosts: boolean;
  openNewPost: boolean;
  openEditPost: boolean;
  openDeletePost: boolean;
  posts: POSTS;
}

export interface PROPS_QUERY_PARAMS_GET_POSTS {
  url: string | null;
  search: string;
  ordering: string;
}

export interface FAVORITE_MESSAGE {
  message: string;
}

export interface PROPS_GET_POSTS {
  folder: string;
  params: PROPS_QUERY_PARAMS_GET_POSTS;
}
