import { VFC, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Switch,
} from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';

import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import {
  selectIsLoadingFolder,
  selectOpenNewFolder,
  selectOpenEditFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncCreateFolder,
  resetOpenNewFolder,
  selectFolder,
} from '../../../stores/slices/folder/folderSlice';

import {
  selectIsLoadingPost,
  selectOpenNewPost,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncCreatePost,
  resetOpenNewPost,
} from '../../../stores/slices/post/postSlice';

const customeStyles = {
  content: {
    top: '55%',
    left: '50%',

    width: 280,
    height: 220,
    padding: '50px',

    transform: 'translate(-50%,-50%)',
  },
};

const NewPost: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const folder = useSelector(selectFolder);
  const isLoadingPost = useSelector(selectIsLoadingPost);
  const openNewPost = useSelector(selectOpenNewPost);
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [Public, setPublic] = useState<boolean>(false);

  const createPost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { folder: folder.id, url, name, text };
    dispatch(fetchPostStart());
    const result = await dispatch(fetchAsyncCreatePost(packet));
    if (fetchAsyncCreatePost.rejected.match(result)) {
      dispatch(resetIsAuth());
      dispatch(fetchPostEnd());
      dispatch(resetOpenNewPost());
      return;
    }
    dispatch(fetchPostEnd());
    dispatch(resetOpenNewPost());
  };

  return (
    <>
      <Modal
        isOpen={openNewPost}
        onRequestClose={() => {
          dispatch(resetOpenNewPost());
        }}
        style={customeStyles}
      >
        <form>
          <h1>SNS clone</h1>
          <div>{isLoadingPost && <CircularProgress />}</div>
          <br />
          <TextField
            placeholder="url"
            type="test"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            placeholder="nickname"
            type="test"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            placeholder="nickname"
            type="test"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <Button
            disabled={!url}
            variant="contained"
            color="primary"
            type="submit"
            onClick={createPost}
          >
            作成
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NewPost;
