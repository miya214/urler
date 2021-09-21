import { VFC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../../stores/app/store';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  fetchAsyncUserActivate,
} from '../../../../stores/slices/auth/authSlice';

interface URLParams {
  uid: string;
  token: string;
}

const UserActivePage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const { uid } = useParams<URLParams>();
  const { token } = useParams<URLParams>();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCredStart());
    const userActivate = async () => {
      const data = {
        uid,
        token,
      };
      const resultReg = await dispatch(fetchAsyncUserActivate(data));
      if (fetchAsyncUserActivate.rejected.match(resultReg)) {
        history.push('/');
      }
    };
    userActivate().catch((e) => alert('何らかのエラーが発生しました'));
    dispatch(fetchCredEnd());
  }, [dispatch, token, uid, history]);
  return (
    <div>
      {isLoadingAuth ? (
        <CircularProgress />
      ) : (
        <div>アカウントを有効にしました</div>
      )}
    </div>
  );
};

export default UserActivePage;
