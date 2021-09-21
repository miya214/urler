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
} from '../../../stores/slices/folder/folderSlice';

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

const NewFolder: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const isLoadingFolder = useSelector(selectIsLoadingFolder);
  const openNewFolder = useSelector(selectOpenNewFolder);
  const [name, setName] = useState<string>('');
  const [Public, setPublic] = useState<boolean>(false);

  const handlePublicChange = () => {
    setPublic(!Public);
  };

  const createFolder = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { name, public: Public };
    dispatch(fetchFolderStart());
    const result = await dispatch(fetchAsyncCreateFolder(packet));
    if (fetchAsyncCreateFolder.rejected.match(result)) {
      dispatch(resetIsAuth());
      dispatch(fetchFolderEnd());
      dispatch(resetOpenNewFolder());
      return;
    }
    dispatch(fetchFolderEnd());
    dispatch(resetOpenNewFolder());
  };

  return (
    <>
      <Modal
        isOpen={openNewFolder}
        onRequestClose={() => {
          dispatch(resetOpenNewFolder());
        }}
        style={customeStyles}
      >
        <form>
          <h1>SNS clone</h1>
          <div>{isLoadingFolder && <CircularProgress />}</div>
          <br />
          <TextField
            placeholder="nickname"
            type="test"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Switch
            checked={Public}
            onChange={handlePublicChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <br />
          <Button
            disabled={!name}
            variant="contained"
            color="primary"
            type="submit"
            onClick={createFolder}
          >
            作成
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NewFolder;
