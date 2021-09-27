import { VFC, useEffect, useCallback, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import { AppDispatch } from '../../../stores/app/store';
import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import { selectMyProfile } from '../../../stores/slices/profile/profileSlice';

import {
  selectFavoriteFolders,
  selectIsLoadingFolder,
  selectIsExistFavoriteFolders,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetFavoriteFolders,
  setFolder,
  setIsExistFavoriteFolders,
  resetFavoriteFoldersCount,
} from '../../../stores/slices/folder/folderSlice';

import SearchBox from '../../atoms/Input/SearchBox';
import OrderSelect from '../../atoms/OrderSelect';
import FavoriteFolderOrderSelect from '../../atoms/FavoriteFolerOrderSelect';
import {
  resetPostsCount,
  setIsExistPosts,
} from '../../../stores/slices/post/postSlice';

import { setActiveIndex } from '../../../stores/slices/bar/barSlice';

import {
  MainBody,
  FolderSection,
  SearchSection,
  SearchContent,
  SearchFieldWrapper,
  NotFoundText,
  LoadingWrapper,
} from '../../blocks/main/MainElements';
import FolderList from '../../blocks/folder/FolderList';
import FolderListItem from '../../blocks/folder/FolderListItem';
import { FolderItemLink } from '../../blocks/folder/FolderElements';
import SearchButton from '../../atoms/Buttons/SearchButton';
import Loading from '../../atoms/Loader';
import MainHeader from '../../blocks/main/MainHeader';

const FavoriteFoldersPage: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const folders = useSelector(selectFavoriteFolders);
  const isExistFolders = useSelector(selectIsExistFavoriteFolders);
  const isLoadingFolder = useSelector(selectIsLoadingFolder);
  const myprofile = useSelector(selectMyProfile);

  const [searchText, setSearchText] = useState<string>('');
  const [orderingText, setOrderingText] = useState<string>('');

  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    dispatch(setActiveIndex(3));
  }, [dispatch]);

  const loadMore = async (page: number) => {
    const nextUrl = folders.next;
    if (!nextUrl && folders.count !== 0) {
      setHasMore(false);
      return;
    }

    const result = await dispatch(
      fetchAsyncGetFavoriteFolders({
        url: nextUrl,
        search: '',
        ordering: '',
      })
    );
    if (fetchAsyncGetFavoriteFolders.rejected.match(result)) {
      dispatch(resetIsAuth());
    }
  };

  const searchFolder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasMore(true);
    dispatch(setIsExistFavoriteFolders());
    dispatch(fetchFolderStart());
    dispatch(resetFavoriteFoldersCount());
    const result = await dispatch(
      fetchAsyncGetFavoriteFolders({
        url: '',
        search: searchText,
        ordering: orderingText,
      })
    );
    if (fetchAsyncGetFavoriteFolders.rejected.match(result)) {
      dispatch(resetIsAuth());
    }
    dispatch(fetchFolderEnd());
  };

  const foldersList = (
    <FolderList>
      {folders.results.map((result) => {
        const folder = {
          id: result.folder.id,
          user: result.folder.user,
          name: result.folder.name,
          public: result.folder.public,
          posts_add: result.folder.posts_add,
          favorite: [myprofile.user],
        };
        return (
          <FolderItemLink
            key={folder.id}
            to={`/folder/${folder.id}`}
            onClick={() => {
              dispatch(resetPostsCount());
              dispatch(setFolder(folder));
              dispatch(setIsExistPosts());
            }}
          >
            <FolderListItem folder={folder} />
            <Divider />
          </FolderItemLink>
        );
      })}
    </FolderList>
  );

  const loader = (
    <LoadingWrapper className="loader" key={0}>
      <Loading />
    </LoadingWrapper>
  );

  return (
    <>
      <MainBody>
        <SearchSection>
          <SearchContent>
            <SearchFieldWrapper>
              <form onSubmit={(e) => searchFolder(e)}>
                <SearchBox changeEvent={(e) => setSearchText(e.target.value)} />
                <FavoriteFolderOrderSelect
                  selectValue={orderingText}
                  changeEvent={(e) => setOrderingText(e.target.value)}
                />
                <SearchButton ButtonText="検索" />
              </form>
            </SearchFieldWrapper>
          </SearchContent>
        </SearchSection>
        <FolderSection>
          {!isLoadingFolder ? (
            isExistFolders ? (
              <InfiniteScroll
                loadMore={loadMore}
                hasMore={hasMore}
                loader={loader}
              >
                {foldersList}
              </InfiniteScroll>
            ) : (
              <NotFoundText>フォルダが見つかりませんでした。</NotFoundText>
            )
          ) : (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          )}
        </FolderSection>
      </MainBody>
    </>
  );
};

export default FavoriteFoldersPage;
