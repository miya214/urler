import { VFC, useEffect, useCallback, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';
import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import {
  selectMyFolders,
  selectFolders,
  selectIsLoadingFolder,
  selectIsSetFolder,
  selectHasMyFolder,
  selectIsExistFolders,
  setOpenNewFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetMyFolders,
  fetchAsyncGetFolders,
  setFolder,
  setIsExistFolders,
  resetFoldersCount,
} from '../../../stores/slices/folder/folderSlice';

import SearchBox from '../../atoms/SearchBox';
import OrderSelect from '../../atoms/OrderSelect';
import {
  resetPostsCount,
  setIsExistPosts,
} from '../../../stores/slices/post/postSlice';

const FoldersPage: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const folders = useSelector(selectFolders);
  const isExistFolders = useSelector(selectIsExistFolders);
  const isLoadingFolder = useSelector(selectIsLoadingFolder);

  const [searchText, setSearchText] = useState<string>('');
  const [orderingText, setOrderingText] = useState<string>('');

  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMore = async (page: number) => {
    const nextUrl = folders.next;
    if (!nextUrl && folders.count !== 0) {
      setHasMore(false);
      return;
    }

    const result = await dispatch(
      fetchAsyncGetFolders({
        url: nextUrl,
        search: '',
        ordering: '',
      })
    );
    if (fetchAsyncGetFolders.rejected.match(result)) {
      dispatch(resetIsAuth());
    }
  };

  const searchFolder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasMore(true);
    dispatch(setIsExistFolders());
    dispatch(fetchFolderStart());
    dispatch(resetFoldersCount());
    const result = await dispatch(
      fetchAsyncGetFolders({
        url: '',
        search: searchText,
        ordering: orderingText,
      })
    );
    if (fetchAsyncGetFolders.rejected.match(result)) {
      dispatch(resetIsAuth());
    }
    dispatch(fetchFolderEnd());
  };

  const foldersList = (
    <ul>
      {folders.results.map((folder) => (
        <li key={folder.id}>
          <Link
            to={`/folder/${folder.id}`}
            onClick={() => {
              dispatch(resetPostsCount());
              dispatch(
                setFolder({
                  id: folder.id,
                  user: folder.user,
                  name: folder.name,
                  public: folder.public,
                  posts_add: folder.posts_add,
                  favorite: folder.favorite,
                })
              );
              dispatch(setIsExistPosts());
            }}
          >
            {folder.name}
          </Link>
          <p>{folder.posts_add}</p>
          <p>{folder.id}</p>
        </li>
      ))}
    </ul>
  );

  const loader = (
    <div className="loader" key={0}>
      <CircularProgress />
    </div>
  );

  return (
    <>
      <form onSubmit={(e) => searchFolder(e)}>
        <SearchBox changeEvent={(e) => setSearchText(e.target.value)} />
        <OrderSelect
          selectValue={orderingText}
          changeEvent={(e) => setOrderingText(e.target.value)}
        />
        <button type="submit">検索</button>
      </form>

      {!isLoadingFolder ? (
        isExistFolders ? (
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
            {foldersList}
          </InfiniteScroll>
        ) : (
          <h1>有りません</h1>
        )
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default FoldersPage;
