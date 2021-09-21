import { VFC, useState, useEffect } from 'react';
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
  selectOpenEditFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncUpdateFolder,
  resetOpenEditFolder,
  selectFolder,
} from '../../../stores/slices/folder/folderSlice';
import {
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncUpdatePost,
  resetOpenEditPost,
  selectIsLoadingPost,
  selectOpenEditPost,
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

const EditPost: VFC<{
  id: string;
  url: string;
  name: string;
  text: string;
  folder: string;
}> = ({ id, url, name, text, folder }) => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingPost = useSelector(selectIsLoadingPost);
  const openEditPost = useSelector(selectOpenEditPost);
  const [Url, setUrl] = useState<string>(url);
  const [Name, setName] = useState<string>(name);
  const [Text, setText] = useState<string>(text);

  useEffect(() => {
    setUrl(url);
    setName(name);
    setText(text);
  }, [name, text, url]);

  const updatePost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { id, url: Url, name: Name, text: Text, folder };
    dispatch(fetchPostStart());
    const result = await dispatch(fetchAsyncUpdatePost(packet));
    if (fetchAsyncUpdateFolder.rejected.match(result)) {
      dispatch(resetIsAuth());
      dispatch(resetOpenEditPost());
      return;
    }
    dispatch(fetchPostEnd());
    dispatch(resetOpenEditPost());
  };

  return (
    <>
      <Modal
        isOpen={openEditPost}
        onRequestClose={() => {
          dispatch(resetOpenEditPost());
        }}
        style={customeStyles}
      >
        <form>
          <h1>SNS clone</h1>
          <div>{isLoadingPost && <CircularProgress />}</div>
          <br />
          <TextField
            placeholder="nickname"
            type="test"
            value={Url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            placeholder="nickname"
            type="test"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            placeholder="nickname"
            type="test"
            value={Text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <Button
            disabled={!Url}
            variant="contained"
            color="primary"
            type="submit"
            onClick={updatePost}
          >
            作成
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditPost;
