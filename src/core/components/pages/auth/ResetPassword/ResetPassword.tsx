import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AppDispatch } from '../../../../stores/app/store';

import {
  AuthFormWrapper,
  AuthFormHeading,
  AuthFormInfo,
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
  fetchAsyncResetPassword,
  selectAuthErrorMessage,
  resetAuthErrorMessage,
} from '../../../../stores/slices/auth/authSlice';

const ResetPasswordPage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const authErrorMessages = useSelector(selectAuthErrorMessage);
  return (
    <Formik
      initialErrors={{ email: 'required' }}
      initialValues={{ email: '' }}
      onSubmit={async (values) => {
        dispatch(fetchCredStart());
        const result = await dispatch(fetchAsyncResetPassword(values));

        if (fetchAsyncResetPassword.fulfilled.match(result)) {
          dispatch(resetAuthErrorMessage());
          history.replace('/password/reset/after');
        }
        dispatch(fetchCredEnd());
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('メールアドレスの形式が違います')
          .required('メールアドレスを入力してください'),
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
              <AuthFormHeading>パスワードリセット</AuthFormHeading>
              <br />
              <AuthFormInfo>
                登録したメールアドレスを入力し、送信ボタンをクリックしてください。
                <br />
                パスワードのリセット手順をメールで送信します。
              </AuthFormInfo>
              <br />
              <LoaderWrapper>{isLoadingAuth && <Loading />}</LoaderWrapper>
              <TxField
                id="standard-basic"
                variant="standard"
                placeholder="email"
                type="input"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email ? (
                <ErrorMessage>{errors.email}</ErrorMessage>
              ) : null}
              <br />
              <AuthFormButton
                isLoading={isLoadingAuth}
                disabled={!isValid}
                ButtonText="送信"
              />
              <br />
              <AuthFormBottomLinkWrapper>
                <AuthFormBottomLink to="/login">
                  ログインページ
                </AuthFormBottomLink>
              </AuthFormBottomLinkWrapper>
              <br />
            </div>
          </form>
        </AuthFormWrapper>
      )}
    </Formik>
  );
};

export default ResetPasswordPage;
