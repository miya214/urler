import { VFC, useEffect, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import Divider from '@mui/material/Divider';

import { AppDispatch } from '../../../stores/app/store';

import {
  resetIsAuth,
  setAuthErrorMessage,
} from '../../../stores/slices/auth/authSlice';

import {
  selectFolders,
  selectIsLoadingFolder,
  selectIsExistFolders,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetFolders,
  setFolder,
  setIsExistFolders,
  resetFoldersCount,
} from '../../../stores/slices/folder/folderSlice';

import { resetPosts } from '../../../stores/slices/post/postSlice';

import { setActiveIndex } from '../../../stores/slices/bar/barSlice';

import SearchBox from '../../atoms/Input/SearchBox';
import OrderSelect from '../../atoms/OrderSelect';
import SearchButton from '../../atoms/Buttons/SearchButton';
import Loading from '../../atoms/Loader';
import TopLinkButton from '../../atoms/Buttons/TopLinkButton';

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
import MainHeader from '../../blocks/main/MainHeader';

const FoldersPage: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const folders = useSelector(selectFolders);
  const isExistFolders = useSelector(selectIsExistFolders);
  const isLoadingFolder = useSelector(selectIsLoadingFolder);

  const [searchText, setSearchText] = useState<string>('');
  const [orderingText, setOrderingText] = useState<string>('');

  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    dispatch(setActiveIndex(2));
  }, [dispatch]);

  const loadMore = async () => {
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
      dispatch(
        setAuthErrorMessage(
          '?????????????????????????????????????????????????????????????????????????????????????????????'
        )
      );
      dispatch(resetIsAuth());
    }
  };

  const searchFolder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0 });
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
      dispatch(
        setAuthErrorMessage(
          '?????????????????????????????????????????????????????????????????????????????????????????????'
        )
      );
      dispatch(resetIsAuth());
    }
    dispatch(fetchFolderEnd());
  };

  const foldersList = (
    <FolderList>
      {folders.results.map((folder) => (
        <FolderItemLink
          key={folder.id}
          to={`/folder/${folder.id}`}
          onClick={() => {
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
            dispatch(resetPosts());
          }}
        >
          <FolderListItem folder={folder} />
          <Divider />
        </FolderItemLink>
      ))}
    </FolderList>
  );

  const loader = (
    <LoadingWrapper className="loader" key={0}>
      <Loading />
    </LoadingWrapper>
  );

  return (
    <>
      <MainHeader
        title="Global"
        isHistory={false}
        buttonElem={<TopLinkButton />}
      />
      <MainBody>
        <SearchSection>
          <SearchContent>
            <SearchFieldWrapper>
              <form onSubmit={(e) => searchFolder(e)}>
                <SearchBox changeEvent={(e) => setSearchText(e.target.value)} />
                <OrderSelect
                  selectValue={orderingText}
                  changeEvent={(e) => setOrderingText(e.target.value)}
                />
                <SearchButton ButtonText="??????" />
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
              <NotFoundText>????????????????????????????????????????????????</NotFoundText>
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

export default FoldersPage;
