import { VFC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectIsAfterRegister } from '../../../../stores/slices/auth/authSlice';

import {
  AuthFormWrapper,
  AuthFormBottomLink,
  AuthFormBottomLinkWrapper,
  AuthFormText,
} from '../../../atoms/Form/FormElements';

const SignUpAfterPage: VFC = () => {
  const isAfterRegister = useSelector(selectIsAfterRegister);
  const history = useHistory();
  useEffect(() => {
    if (!isAfterRegister) {
      history.replace('/');
    }
  }, [history, isAfterRegister]);
  return (
    <AuthFormWrapper>
      <AuthFormText>メールを送信しました</AuthFormText>

      <AuthFormText>
        メールに添付されたURLを開き、アカウントの有効化を行ってください。
      </AuthFormText>
      <AuthFormBottomLinkWrapper>
        <AuthFormBottomLink to="/login">ログイン画面に戻る</AuthFormBottomLink>
      </AuthFormBottomLinkWrapper>
    </AuthFormWrapper>
  );
};

export default SignUpAfterPage;
