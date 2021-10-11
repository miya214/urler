import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AppDispatch } from '../../../stores/app/store';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  fetchAsyncLogin,
  selectAuthErrorMessage,
  resetAuthErrorMessage,
} from '../../../stores/slices/auth/authSlice';

import {
  setInfoMessage,
  setIsExistInfoMessage,
} from '../../../stores/slices/message/messageSlice';

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
import ErrorAlert from '../../atoms/Alert/ErrorAlert';

export interface LOCATION_FROM_PROPS {
  from: string;
}

const LoginPage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation<LOCATION_FROM_PROPS>();
  const authErrorMessages = useSelector(selectAuthErrorMessage);
  return (
    <Formik
      initialErrors={{ email: 'required' }}
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        dispatch(fetchCredStart());
        const result = await dispatch(fetchAsyncLogin(values));

        if (fetchAsyncLogin.fulfilled.match(result)) {
          dispatch(resetAuthErrorMessage());
          dispatch(setInfoMessage('ログインしました'));
          dispatch(setIsExistInfoMessage());
          dispatch(fetchCredEnd());
          history.replace(state.from ?? '/');
        }
        dispatch(fetchCredEnd());
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
          {authErrorMessages.map((message) => (
            <ErrorAlert text={message} key={message} />
          ))}
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
