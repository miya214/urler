import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../../stores/app/store';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  fetchAsyncRegister,
} from '../../../../stores/slices/auth/authSlice';

const SignUpPage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  return (
    <Formik
      initialErrors={{ email: 'required' }}
      initialValues={{ email: '', password: '', re_password: '' }}
      onSubmit={async (values) => {
        dispatch(fetchCredStart());
        const resultReg = await dispatch(fetchAsyncRegister(values));

        if (fetchAsyncRegister.fulfilled.match(resultReg)) {
          history.push('/signup/after');
        }
        dispatch(fetchCredEnd());
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('メールアドレスの形式が違います')
          .required('メールアドレスを入力してください'),
        password: Yup.string()
          .required('パスワードを入力してください')
          .min(8, 'パスワードは8文字以上で設定してください'),
        re_password: Yup.string()
          .required('確認用のパスワードを入力してください')
          .oneOf([Yup.ref('password'), null], 'パスワードが一致しません')
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
                placeholder="メールアドレス"
                type="input"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <br />
              {touched.email && errors.email ? <div>{errors.email}</div> : null}
              <br />
              <TextField
                placeholder="パスワード"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <br />
              {touched.password && errors.password ? (
                <div>{errors.password}</div>
              ) : null}
              <br />
              <TextField
                placeholder="パスワード(確認用)"
                type="password"
                name="re_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.re_password}
              />
              <br />
              {touched.re_password && errors.re_password ? (
                <div>{errors.re_password}</div>
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

export default SignUpPage;
