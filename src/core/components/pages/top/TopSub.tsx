import { VFC, useEffect, useCallback, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import Divider from '@mui/material/Divider';
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
  selectMyFoldersSearchResult,
  searchMyFolders,
} from '../../../stores/slices/folder/folderSlice';
import {
  resetPostsCount,
  setIsExistPosts,
  resetPosts,
} from '../../../stores/slices/post/postSlice';

import { setActiveIndex } from '../../../stores/slices/bar/barSlice';

import SearchBox from '../../atoms/Input/SearchBox';
import PublicSelect from '../../atoms/Input/PublicSelect';
import OrderSelect from '../../atoms/OrderSelect';
import TopOrderSelect from '../../atoms/TopOrderSelect';
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
import { OpenModalBtn } from '../../atoms/Buttons/ButtonDesign';

const TopSubPage: VFC = () => {
  const hasMyFolder = useSelector(selectHasMyFolder);
  const dispatch: AppDispatch = useDispatch();

  const [searchText, setSearchText] = useState<string>('');
  const [orderingText, setOrderingText] = useState<string>('');
  const [Public, setPublic] = useState<string>('');
  const isSetfolder = useSelector(selectIsSetFolder);
  const myfoldersSearchResult = useSelector(selectMyFoldersSearchResult);
  const isLoadingFolder = useSelector(selectIsLoadingFolder);
  const myfolders = useSelector(selectMyFolders);

  const searchFolder = (e: FormEvent<HTMLFormElement>) => {
    window.scrollTo({ top: 0 });
    e.preventDefault();
    dispatch(setHasMyFolder());
    dispatch(fetchFolderStart());
    dispatch(
      searchMyFolders({
        search: searchText,
        public: Public,
        ordering: orderingText,
      })
    );

    dispatch(fetchFolderEnd());
  };

  return (
    <>
      <NewFolder />
      <MainHeader
        title="Top"
        isHistory={false}
        buttonElem={
          <OpenModalBtn
            onClick={() => {
              dispatch(setOpenNewFolder());
            }}
          >
            作成
          </OpenModalBtn>
        }
      />
      <MainBody>
        <SearchSection>
          <SearchContent>
            <SearchFieldWrapper>
              <form onSubmit={(e) => searchFolder(e)}>
                <SearchBox changeEvent={(e) => setSearchText(e.target.value)} />
                <PublicSelect
                  checkedNot={() => setPublic('')}
                  checkedPublic={() => setPublic('true')}
                  checkedPrivate={() => setPublic('false')}
                />
                <TopOrderSelect
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
            hasMyFolder ? (
              <FolderList>
                {myfoldersSearchResult.map((folder) => (
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

export default TopSubPage;
