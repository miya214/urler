import { VFC, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAfterResetPassword } from '../../../../stores/slices/auth/authSlice';

const ResetPasswordAfterPage: VFC = () => {
  const isAfterResetPassword = useSelector(selectIsAfterResetPassword);
  const history = useHistory();
  useEffect(() => {
    if (!isAfterResetPassword) {
      history.push('/');
    }
  });
  return (
    <div>
      <p>メールを送信しました</p>
      <br />
      <p>
        メールに添付されたURLを開き、そのページからパスワードを変更してください
      </p>
      <Link to="/login">ログイン画面に戻る</Link>
    </div>
  );
};

export default ResetPasswordAfterPage;
