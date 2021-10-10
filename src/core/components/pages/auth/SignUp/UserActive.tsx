import { VFC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../../stores/app/store';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  selectIsUserActive,
  fetchAsyncUserActivate,
} from '../../../../stores/slices/auth/authSlice';

import {
  AuthFormWrapper,
  AuthFormBottomLinkWrapper,
  AuthFormBottomLink,
  AuthFormText,
} from '../../../atoms/Form/FormElements';

import Loading from '../../../atoms/Loader';

interface URLParams {
  uid: string;
  token: string;
}

const UserActivePage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const isUserActive = useSelector(selectIsUserActive);
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
        history.replace('/');
      }
    };
    if (!isUserActive) {
      userActivate().catch((e) => alert('何らかのエラーが発生しました'));
    }
    dispatch(fetchCredEnd());
  }, [dispatch, token, uid, history, isUserActive]);
  return (
    <AuthFormWrapper>
      {isLoadingAuth ? (
        <Loading />
      ) : (
        <>
          <AuthFormText>アカウントを有効にしました</AuthFormText>{' '}
          <AuthFormBottomLinkWrapper>
            <AuthFormBottomLink to="/login">
              ログイン画面に戻る
            </AuthFormBottomLink>
          </AuthFormBottomLinkWrapper>
        </>
      )}
    </AuthFormWrapper>
  );
};

export default UserActivePage;
