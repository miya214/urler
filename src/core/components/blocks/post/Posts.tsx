import { VFC, useEffect, useCallback, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';
import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import { selectFolder } from '../../../stores/slices/folder/folderSlice';

import {
  selectPosts,
  selectIsLoadingPost,
  selectIsSetPost,
  selectIsExistPosts,
  setOpenNewPost,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncGetPosts,
  setIsExistPosts,
  resetPostsCount,
  setOpenEditPost,
} from '../../../stores/slices/post/postSlice';

import SearchBox from '../../atoms/SearchBox';
import OrderSelect from '../../atoms/OrderSelect';
import PostOrderSelect from '../../atoms/PostOrderSelect';

import NewPost from './NewPost';
import EditPost from './EditPost';

const Posts: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const folder = useSelector(selectFolder);
  const posts = useSelector(selectPosts);
  const isExistPosts = useSelector(selectIsExistPosts);
  const isLoadingPost = useSelector(selectIsLoadingPost);

  const [searchText, setSearchText] = useState<string>('');
  const [orderingText, setOrderingText] = useState<string>('');

  const [hasMore, setHasMore] = useState<boolean>(true);

  const [editPostId, setEditPostId] = useState<string>('');
  const [editPostUrl, setEditPostUrl] = useState<string>('');
  const [editPostName, setEditPostName] = useState<string>('');
  const [editPostText, setEditPostText] = useState<string>('');

  const loadMore = async (page: number) => {
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

  const postsList = (
    <ul>
      {posts.results.map((post) => (
        <div>
          <li key={post.id}>
            <p>{post.name}</p>
            <p>{post.text}</p>
            <p>{post.url}</p>
          </li>
          <button
            type="button"
            onClick={() => {
              setEditPostId(post.id);
              setEditPostUrl(post.url);
              setEditPostName(post.name);
              setEditPostText(post.text);
              dispatch(setOpenEditPost());
            }}
          >
            編集
          </button>
        </div>
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
      <form onSubmit={(e) => searchPost(e)}>
        <SearchBox changeEvent={(e) => setSearchText(e.target.value)} />
        <PostOrderSelect
          selectValue={orderingText}
          changeEvent={(e) => setOrderingText(e.target.value)}
        />
        <button type="submit">検索</button>
      </form>

      <NewPost />
      <button
        type="button"
        onClick={() => {
          dispatch(setOpenNewPost());
        }}
      >
        作成
      </button>
      {editPostId && (
        <EditPost
          id={editPostId}
          url={editPostUrl}
          name={editPostName}
          text={editPostText}
          folder={folder.id}
        />
      )}

      {!isLoadingPost ? (
        isExistPosts ? (
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
            {postsList}
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

export default Posts;
