import { VFC, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';

import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import {
  selectIsLoadingProf,
  selectMyProfile,
  selectOpenProfile,
  resetOpenProfile,
  fetchProfStart,
  fetchProfEnd,
  fetchAsyncUpdateProf,
  editNickname,
} from '../../../stores/slices/profile/profileSlice';

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

const EditProfile: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const isLoadingProf = useSelector(selectIsLoadingProf);
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectMyProfile);
  const [Nickname, setNickname] = useState<string>(profile.nickname);

  const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { id: profile.id, nickname: Nickname };
    dispatch(fetchProfStart());
    dispatch(editNickname(Nickname));
    const result = await dispatch(fetchAsyncUpdateProf(packet));
    if (fetchAsyncUpdateProf.rejected.match(result)) {
      dispatch(resetIsAuth());
      dispatch(resetOpenProfile());
      history.push({
        pathname: '/login',
        state: {
          from: '/mypage',
        },
      });
      return;
    }
    dispatch(fetchProfEnd());
    dispatch(resetOpenProfile());
  };

  return (
    <>
      <Modal
        isOpen={openProfile}
        onRequestClose={() => {
          dispatch(resetOpenProfile());
        }}
        style={customeStyles}
      >
        <form>
          <h1>SNS clone</h1>
          <div>{isLoadingProf && <CircularProgress />}</div>
          <br />
          <TextField
            placeholder="nickname"
            type="test"
            value={Nickname}
            onChange={(e) =>
              // dispatch(editNickname(e.target.value))；
              setNickname(e.target.value)
            }
          />
          <br />
          <Button
            disabled={!Nickname}
            variant="contained"
            color="primary"
            type="submit"
            onClick={updateProfile}
          >
            Update
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;
