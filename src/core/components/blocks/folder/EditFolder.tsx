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
  selectOpenEditFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncUpdateFolder,
  resetOpenEditFolder,
  selectFolder,
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

const EditFolder: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingFolder = useSelector(selectIsLoadingFolder);
  const openEditFolder = useSelector(selectOpenEditFolder);
  const folder = useSelector(selectFolder);
  const [name, setName] = useState<string>(folder.name);
  const [Public, setPublic] = useState<boolean>(folder.public);

  const handlePublicChange = () => {
    setPublic(!Public);
  };

  const updateFolder = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { id: folder.id, name, public: Public };
    dispatch(fetchFolderStart());
    const result = await dispatch(fetchAsyncUpdateFolder(packet));
    if (fetchAsyncUpdateFolder.rejected.match(result)) {
      dispatch(resetIsAuth());
      dispatch(resetOpenEditFolder());
      return;
    }
    dispatch(fetchFolderEnd());
    dispatch(resetOpenEditFolder());
  };

  return (
    <>
      <Modal
        isOpen={openEditFolder}
        onRequestClose={() => {
          dispatch(resetOpenEditFolder());
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
            onClick={updateFolder}
          >
            作成
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditFolder;
