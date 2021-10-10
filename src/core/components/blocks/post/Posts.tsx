import { VFC, useEffect, useCallback, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AppDispatch } from '../../../stores/app/store';

import {
  resetIsAuth,
  setAuthErrorMessage,
} from '../../../stores/slices/auth/authSlice';

import {
  setInfoMessage,
  setIsExistInfoMessage,
} from '../../../stores/slices/message/messageSlice';
import { selectFolder } from '../../../stores/slices/folder/folderSlice';

import { selectMyProfile } from '../../../stores/slices/profile/profileSlice';

import {
  selectPosts,
  selectIsLoadingPost,
  selectIsNewPost,
  selectIsExistPosts,
  setOpenNewPost,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncGetPosts,
  fetchAsyncDeleteSelectPost,
  setIsExistPosts,
  resetPostsCount,
  setOpenEditPost,
  resetIsNewPost,
} from '../../../stores/slices/post/postSlice';

import {
  MainBody,
  FolderSection,
  SearchSection,
  SearchContent,
  SearchFieldWrapper,
  NotFoundText,
  LoadingWrapper,
} from '../main/MainElements';

import SearchBox from '../../atoms/Input/SearchBox';
import OrderSelect from '../../atoms/OrderSelect';
import PostOrderSelect from '../../atoms/PostOrderSelect';

import NewPost from './NewPost';
import EditPost from './EditPost';

import Loading from '../../atoms/Loader';
import MainHeader from '../main/MainHeader';
import { OpenModalBtn } from '../../atoms/Buttons/ButtonDesign';

import TopLinkButton from '../../atoms/Buttons/TopLinkButton';

import SearchButton from '../../atoms/Buttons/SearchButton';

import PostListItem from './PostsListItem';
import useMultiplePostChecked from './CheckPost';
import {
  PostListItemWithCheckBox,
  WCPostListItem,
  PostCheckBoxWrapper,
  PostEditButtonWrapper,
  PostSectionHeader,
  PostSelectDeleteButton,
  PostCreateButton,
} from './PostsElements';

const Posts: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const folder = useSelector(selectFolder);
  const profile = useSelector(selectMyProfile);
  const posts = useSelector(selectPosts);
  const isExistPosts = useSelector(selectIsExistPosts);
  const isNewPost = useSelector(selectIsNewPost);
  const isLoadingPost = useSelector(selectIsLoadingPost);

  const [searchText, setSearchText] = useState<string>('');
  const [orderingText, setOrderingText] = useState<string>('');

  const [hasMore, setHasMore] = useState<boolean>(true);

  const [editPostId, setEditPostId] = useState<string>('');
  const [editPostUrl, setEditPostUrl] = useState<string>('');
  const [editPostName, setEditPostName] = useState<string>('');
  const [editPostText, setEditPostText] = useState<string>('');

  const [checkBoxToggle, setCheckBoxToggle] = useState<boolean>(false);

  const { checked, toggleChecked, allCheck, clearCheck } =
    useMultiplePostChecked(posts.results.map((post) => post.id));

  const loadMore = async (page: number) => {
    dispatch(resetIsNewPost());
    if (!folder.id) {
      return;
    }

    const nextUrl = posts.next;
    if (!nextUrl && posts.count !== 0) {
      setHasMore(false);
      return;
    }

    const result = await dispatch(
      fetchAsyncGetPosts({
        folder: folder.id,
        params: {
          url: nextUrl,
          search: '',
          ordering: '',
        },
      })
    );
    if (fetchAsyncGetPosts.rejected.match(result)) {
      dispatch(resetPostsCount());
      dispatch(resetIsAuth());
    }
  };

  const searchPost = async (e: FormEvent<HTMLFormElement>) => {
    clearCheck();

    window.scrollTo({ top: 0 });
    dispatch(resetIsNewPost());
    e.preventDefault();
    setHasMore(true);
    dispatch(setIsExistPosts());
    dispatch(fetchPostStart());
    dispatch(resetPostsCount());
    await dispatch(
      fetchAsyncGetPosts({
        folder: folder.id,
        params: {
          url: '',
          search: searchText,
          ordering: orderingText,
        },
      })
    );

    dispatch(fetchPostEnd());
  };

  const deleteSelectPost = async () => {
    dispatch(fetchPostStart());
    const result = await dispatch(fetchAsyncDeleteSelectPost(checked));
    setCheckBoxToggle(false);
    dispatch(fetchPostEnd());
  };

  const postListInMyFolder = (
    <ul>
      {posts.results.map((post) => (
        <PostListItemWithCheckBox key={post.id}>
          <PostCheckBoxWrapper className={checkBoxToggle ? 'active' : ''}>
            <Checkbox
              size="small"
              value={post.id}
              onChange={() => toggleChecked(post.id)}
              checked={checked.includes(post.id)}
            />
          </PostCheckBoxWrapper>

          <WCPostListItem>
            <PostListItem post={post} />
          </WCPostListItem>

          <PostEditButtonWrapper className={!checkBoxToggle ? 'active' : ''}>
            <IconButton
              type="button"
              aria-label="edit-post"
              color="primary"
              onClick={() => {
                setEditPostId(post.id);
                setEditPostUrl(post.url);
                setEditPostName(post.name);
                setEditPostText(post.text);
                dispatch(setOpenEditPost());
              }}
            >
              <EditOutlinedIcon sx={{ color: '#79bd9a' }} />
            </IconButton>
          </PostEditButtonWrapper>
        </PostListItemWithCheckBox>
      ))}
    </ul>
  );

  const postListOthers = (
    <ul>
      {posts.results.map((post) => (
        <PostListItem post={post} />
      ))}
    </ul>
  );

  const loader = (
    <LoadingWrapper className="loader" key={0}>
      <Loading />
    </LoadingWrapper>
  );

  return (
    <>
      <NewPost />

      {editPostId && (
        <EditPost
          id={editPostId}
          url={editPostUrl}
          name={editPostName}
          text={editPostText}
          folder={folder.id}
        />
      )}

      <MainBody>
        <SearchSection>
          <SearchContent>
            <SearchFieldWrapper>
              <form onSubmit={(e) => searchPost(e)}>
                <SearchBox changeEvent={(e) => setSearchText(e.target.value)} />
                <PostOrderSelect
                  selectValue={orderingText}
                  changeEvent={(e) => setOrderingText(e.target.value)}
                />
                <SearchButton ButtonText="検索" />
              </form>
            </SearchFieldWrapper>
          </SearchContent>
        </SearchSection>

        <FolderSection>
          {folder.user === profile.user && (
            <PostSectionHeader>
              <IconButton
                type="button"
                aria-label="edit-post"
                onClick={() => {
                  setCheckBoxToggle(!checkBoxToggle);
                }}
              >
                <ChangeCircleIcon sx={{ color: '#79bd9a' }} />
              </IconButton>
              <PostCreateButton
                type="button"
                aria-label="edit-post"
                color="primary"
                onClick={() => {
                  dispatch(setOpenNewPost());
                }}
                className={!checkBoxToggle ? 'active' : ''}
              >
                作成
              </PostCreateButton>
              {/* <PostCreateIconButton
                type="button"
                aria-label="edit-post"
                color="primary"
                onClick={() => {
                  dispatch(setOpenNewPost());
                }}
                className={!checkBoxToggle ? 'active' : ''}
              >
                <AddBoxOutlinedIcon />
              </PostCreateIconButton> */}

              <PostSelectDeleteButton
                type="button"
                disabled={checked.length === 0 || isLoadingPost}
                onClick={deleteSelectPost}
                className={checkBoxToggle ? 'active' : ''}
              >
                {checked.length}件削除
              </PostSelectDeleteButton>
            </PostSectionHeader>
          )}
          {/* ローディング中では無いかつ、ポストが存在するまたはポストが新しく作成された場合にポストリストが表示される */}
          {!isLoadingPost ? (
            isExistPosts ? (
              <InfiniteScroll
                loadMore={loadMore}
                hasMore={hasMore}
                loader={loader}
              >
                {folder.user === profile.user
                  ? postListInMyFolder
                  : postListOthers}
              </InfiniteScroll>
            ) : isNewPost ? (
              <div>
                {folder.user === profile.user
                  ? postListInMyFolder
                  : postListOthers}
              </div>
            ) : (
              <NotFoundText>見つかりませんでした。</NotFoundText>
            )
          ) : (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          )}
        </FolderSection>

        {/* {!isLoadingPost ? (
          isExistPosts ? (
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
              loader={loader}
            >
              {postsList}
            </InfiniteScroll>
          ) : isNewPost ? (
            <div>{postsList}</div>
          ) : (
            <h1>有りません</h1>
          )
        ) : (
          <CircularProgress />
        )} */}
      </MainBody>
    </>
  );
};

export default Posts;
