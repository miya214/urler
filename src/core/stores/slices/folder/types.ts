export interface PROPS_CREATE_FOLDER {
  name: string;
  public: boolean;
}

export interface PROPS_UPDATE_FOLDER {
  id: string;
  name: string;
  public: boolean;
}

export interface PROPS_FOLDER_ID {
  id: string;
}

export interface FOLDER {
  id: string;
  user: string;
  name: string;
  public: boolean;
  posts_add: string;
  favorite: string[];
}

export interface FOLDERS {
  count: number;
  next: null | string;
  previous: null | string;
  results: FOLDER[];
}

export interface FOLDER_WITHOUT_FAVORITE {
  folder: {
    id: string;
    user: string;
    name: string;
    public: boolean;
    posts_add: string;
  };
}

export interface FOLDERS_WITHOUT_FAVORITE {
  count: number;
  next: null | string;
  previous: null | string;
  results: FOLDER_WITHOUT_FAVORITE[];
}

export interface FOLDER_STATE {
  isLoadingFolder: boolean;
  isLoadingFavorite: boolean;
  isSetFolder: boolean;
  isExistFolders: boolean;
  isExistFavoriteFolders: boolean;
  hasMyFolder: boolean;
  openNewFolder: boolean;
  openEditFolder: boolean;
  openDeleteFolder: boolean;
  folder: FOLDER;
  myfolders: FOLDERS;
  folders: FOLDERS;
  favoritefolders: FOLDERS_WITHOUT_FAVORITE;
}

export interface PROPS_QUERY_PARAMS_GET_FOLDERS {
  url: string | null;
  search: string;
  ordering: string;
}

export interface PROPS_QUERY_PARAMS_GET_MYFOLDERS {
  url: string | null;
  search: string;
  ordering: string;
  public: string;
}

export interface RESPONSE_POST_FAVORITE {
  isFavorite: boolean;
  message: string;
}
