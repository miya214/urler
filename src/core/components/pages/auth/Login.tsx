import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  fetchAsyncLogin,
} from '../../../stores/slices/auth/authSlice';

export interface LOCATION_FROM_PROPS {
  from: string;
}

const LoginPage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation<LOCATION_FROM_PROPS>();
  return (
    <Formik
      initialErrors={{ email: 'required' }}
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        dispatch(fetchCredStart());
        const result = await dispatch(fetchAsyncLogin(values));
        dispatch(fetchCredEnd());

        if (fetchAsyncLogin.fulfilled.match(result)) {
          history.push(state.from ?? '/');
        }
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('メールアドレスの形式が違います')
          .required('メールアドレスを入力してください'),
        password: Yup.string().required('パスワードを入力してください'),
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
              <h1>SNS clone</h1>
              <br />
              <div>{isLoadingAuth && <CircularProgress />}</div>
              <br />
              <TextField
                placeholder="email"
                type="input"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <br />
              {touched.email && errors.email ? <div>{errors.email}</div> : null}
              <TextField
                placeholder="password"
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
              <br />
              <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
                type="submit"
              >
                Login
              </Button>
              <br />
              <br />
              <Link to="/signup">新規登録はこちら</Link>
              <br />
              <Link to="/password/reset">パスワードを忘れた方はこちら</Link>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
