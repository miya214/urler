import { VFC, useEffect, useCallback, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';
import NewFolder from '../../blocks/folder/NewFolder';
import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import {
  selectMyFolders,
  selectFolders,
  selectIsLoadingFolder,
  selectIsSetFolder,
  selectHasMyFolder,
  setOpenNewFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetMyFolders,
  fetchAsyncGetFolders,
  setFolder,
  setHasMyFolder,
  resetMyFoldersCount,
} from '../../../stores/slices/folder/folderSlice';

import SearchBox from '../../atoms/SearchBox';
import PublicSelect from '../../atoms/PublicSelect';
import OrderSelect from '../../atoms/OrderSelect';
import {
  resetPostsCount,
  setIsExistPosts,
} from '../../../stores/slices/post/postSlice';

const TopPage: VFC = () => {
  const hasMyFolder = useSelector(selectHasMyFolder);
  const dispatch: AppDispatch = useDispatch();

  const [searchText, setSearchText] = useState<string>('');
  const [orderingText, setOrderingText] = useState<string>('');
  const [Public, setPublic] = useState<string>('');
  const isSetfolder = useSelector(selectIsSetFolder);
  const myfolders = useSelector(selectMyFolders);
  const isLoadingFolder = useSelector(selectIsLoadingFolder);

  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMore = async (page: number) => {
    const nextUrl = myfolders.next;
    if (!nextUrl && myfolders.count !== 0) {
      setHasMore(false);
      return;
    }

    const result = await dispatch(
      fetchAsyncGetMyFolders({
        url: nextUrl,
        search: '',
        ordering: '',
        public: '',
      })
    );
    if (fetchAsyncGetMyFolders.rejected.match(result)) {
      dispatch(resetIsAuth());
    }
  };

  const searchFolder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasMore(true);
    dispatch(setHasMyFolder());
    dispatch(fetchFolderStart());
    dispatch(resetMyFoldersCount());
    await dispatch(
      fetchAsyncGetMyFolders({
        url: '',
        search: searchText,
        ordering: orderingText,
        public: Public,
      })
    );
    dispatch(fetchFolderEnd());
  };

  const foldersList = (
    <ul>
      {myfolders.results.map((folder) => (
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
      <NewFolder />
      <button
        type="button"
        onClick={() => {
          dispatch(setOpenNewFolder());
        }}
      >
        作成
      </button>
      <form onSubmit={(e) => searchFolder(e)}>
        <SearchBox changeEvent={(e) => setSearchText(e.target.value)} />
        <PublicSelect
          checkedNot={() => setPublic('')}
          checkedPublic={() => setPublic('true')}
          checkedPrivate={() => setPublic('false')}
        />
        <OrderSelect
          selectValue={orderingText}
          changeEvent={(e) => setOrderingText(e.target.value)}
        />
        <button type="submit">検索</button>
      </form>
      <Link to="/mypage">マイページ</Link>
      {!isLoadingFolder ? (
        hasMyFolder ? (
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

export default TopPage;
