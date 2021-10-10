import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { AppDispatch } from '../../../../stores/app/store';

import {
  AuthFormWrapper,
  AuthFormHeading,
  TxField,
  ErrorMessage,
  LoaderWrapper,
  AuthFormBottomLink,
  AuthFormBottomLinkWrapper,
} from '../../../atoms/Form/FormElements';

import AuthFormButton from '../../../atoms/Buttons/AuthFormButton';
import Loading from '../../../atoms/Loader';
import ErrorAlert from '../../../atoms/Alert/ErrorAlert';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  fetchAsyncRegister,
  selectAuthErrorMessage,
  resetAuthErrorMessage,
} from '../../../../stores/slices/auth/authSlice';

const SignUpPage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const authErrorMessages = useSelector(selectAuthErrorMessage);
  return (
    <Formik
      initialErrors={{ email: 'required' }}
      initialValues={{ email: '', password: '', re_password: '' }}
      onSubmit={async (values) => {
        dispatch(fetchCredStart());
        dispatch(resetAuthErrorMessage());
        const resultReg = await dispatch(fetchAsyncRegister(values));

        if (fetchAsyncRegister.fulfilled.match(resultReg)) {
          dispatch(resetAuthErrorMessage());
          history.replace('/signup/after');
        }
        dispatch(fetchCredEnd());
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('メールアドレスの形式が違います')
          .required('メールアドレスを入力してください'),
        password: Yup.string()
          .required('パスワードを入力してください')
          .min(8, 'パスワードは9文字以上で設定してください'),
        re_password: Yup.string()
          .required('確認用のパスワードを入力してください')
          .oneOf([Yup.ref('password'), null], 'パスワードが一致しません')
          .min(8, 'パスワードは9文字以上で設定してください'),
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
            <ErrorAlert text={message} />
          ))}
          <form onSubmit={handleSubmit}>
            <div>
              <AuthFormHeading>新規登録</AuthFormHeading>
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
              <TxField
                id="standard-basic"
                variant="standard"
                placeholder="パスワード(確認用)"
                type="password"
                name="re_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.re_password}
              />
              {touched.re_password && errors.re_password ? (
                <ErrorMessage>{errors.re_password}</ErrorMessage>
              ) : null}
              <br />

              <AuthFormButton
                isLoading={isLoadingAuth}
                disabled={!isValid}
                ButtonText="新規登録"
              />
              <br />
              <AuthFormBottomLinkWrapper>
                <AuthFormBottomLink to="/login">
                  登録済みの方はこちら
                </AuthFormBottomLink>
              </AuthFormBottomLinkWrapper>
            </div>
          </form>
        </AuthFormWrapper>
      )}
    </Formik>
  );
};

export default SignUpPage;
