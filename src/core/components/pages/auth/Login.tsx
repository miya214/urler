import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';
import {
  AuthFormWrapper,
  AuthFormHeading,
  TxField,
  ErrorMessage,
  LoaderWrapper,
  AuthFormBottomLink,
  AuthFormBottomLinkWrapper,
} from '../../atoms/Form/FormElements';

import AuthFormButton from '../../atoms/Buttons/AuthFormButton';
import Loading from '../../atoms/Loader';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  fetchAsyncLogin,
} from '../../../stores/slices/auth/authSlice';
import {
  fetchAsyncGetMyProf,
  fetchProfStart,
  fetchProfEnd,
  selectMyProfile,
} from '../../../stores/slices/profile/profileSlice';

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
        <AuthFormWrapper>
          <form onSubmit={handleSubmit}>
            <div>
              <AuthFormHeading>ログイン</AuthFormHeading>
              <br />
              <LoaderWrapper>{isLoadingAuth && <Loading />}</LoaderWrapper>
              <TxField
                id="standard-basic"
                variant="standard"
                placeholder="メールアドレス"
                type="input"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email ? (
                <ErrorMessage>{errors.email}</ErrorMessage>
              ) : null}
              <TxField
                id="standard-basic"
                variant="standard"
                placeholder="パスワード"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password ? (
                <ErrorMessage>{errors.password}</ErrorMessage>
              ) : null}
              <br />

              <AuthFormButton
                isLoading={isLoadingAuth}
                disabled={!isValid}
                ButtonText="ログイン"
              />
              <br />
              <AuthFormBottomLinkWrapper>
                <AuthFormBottomLink to="/password/reset">
                  パスワードを忘れた場合
                </AuthFormBottomLink>
                <br />
                <AuthFormBottomLink to="/signup">
                  新規登録はこちら
                </AuthFormBottomLink>
              </AuthFormBottomLinkWrapper>
            </div>
          </form>
        </AuthFormWrapper>
      )}
    </Formik>
  );
};

export default LoginPage;
