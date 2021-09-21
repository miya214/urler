import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useParams, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../../stores/app/store';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  fetchAsyncResetPasswordConfirm,
} from '../../../../stores/slices/auth/authSlice';

interface URLParams {
  uid: string;
  token: string;
}

const ResetPasswordCofirmPage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { uid } = useParams<URLParams>();
  const { token } = useParams<URLParams>();
  return (
    <Formik
      initialErrors={{ new_password: 'required' }}
      initialValues={{ uid, token, new_password: '', re_new_password: '' }}
      onSubmit={async (values) => {
        dispatch(fetchCredStart());
        const resultReg = await dispatch(
          fetchAsyncResetPasswordConfirm(values)
        );

        if (fetchAsyncResetPasswordConfirm.fulfilled.match(resultReg)) {
          history.push('/login');
        }
        if (fetchAsyncResetPasswordConfirm.rejected.match(resultReg)) {
          alert('無効なURLです');
        }
        dispatch(fetchCredEnd());
      }}
      validationSchema={Yup.object().shape({
        new_password: Yup.string()
          .required('パスワードを入力してください')
          .min(8, 'パスワードは8文字以上で設定してください'),
        re_new_password: Yup.string()
          .required('確認用のパスワードを入力してください')
          .oneOf([Yup.ref('new_password'), null], 'パスワードが一致しません')
          .min(8, 'パスワードは8文字以上で設定してください'),
      })}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <h1>UMA</h1>
              <br />
              <div>{isLoadingAuth && <CircularProgress />}</div>
              <br />

              <TextField
                placeholder="パスワード"
                type="password"
                name="new_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.new_password}
              />
              <br />
              {touched.new_password && errors.new_password ? (
                <div>{errors.new_password}</div>
              ) : null}
              <br />
              <TextField
                placeholder="パスワード(確認用)"
                type="password"
                name="re_new_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.re_new_password}
              />
              <br />
              {touched.re_new_password && errors.re_new_password ? (
                <div>{errors.re_new_password}</div>
              ) : null}
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
                type="submit"
              >
                新規登録
              </Button>
              <br />
              <br />
              <Link to="/login">登録済みの方はこちら</Link>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default ResetPasswordCofirmPage;
