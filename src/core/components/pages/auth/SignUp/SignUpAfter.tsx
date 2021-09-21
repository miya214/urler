import { VFC, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAfterRegister } from '../../../../stores/slices/auth/authSlice';

const SignUpAfterPage: VFC = () => {
  const isAfterRegister = useSelector(selectIsAfterRegister);
  const history = useHistory();
  useEffect(() => {
    if (!isAfterRegister) {
      history.push('/');
    }
  }, [history, isAfterRegister]);
  return (
    <div>
      <p>メールを送信しました</p>
      <br />
      <p>メールに添付されたURLを開き、アカウントの有効化を行ってください</p>
      <Link to="/login">ログイン画面に戻る</Link>
    </div>
  );
};

export default SignUpAfterPage;
