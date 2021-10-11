import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AppDispatch } from '../../../../stores/app/store';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsLoadingAuth,
  fetchAsyncResetPasswordConfirm,
  selectAuthErrorMessage,
  resetAuthErrorMessage,
} from '../../../../stores/slices/auth/authSlice';

import {
  AuthFormWrapper,
  AuthFormHeading,
  AuthFormInfo,
  TxField,
  ErrorMessage,
  LoaderWrapper,
} from '../../../atoms/Form/FormElements';
import AuthFormButton from '../../../atoms/Buttons/AuthFormButton';
import Loading from '../../../atoms/Loader';
import ErrorAlert from '../../../atoms/Alert/ErrorAlert';

interface URLParams {
  uid: string;
  token: string;
}

const ResetPasswordCofirmPage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const authErrorMessages = useSelector(selectAuthErrorMessage);
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
          dispatch(resetAuthErrorMessage());
          history.replace('/login');
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
        <AuthFormWrapper>
          {authErrorMessages.map((message) => (
            <ErrorAlert text={message} key={message} />
          ))}
          <form onSubmit={handleSubmit}>
            <div>
              <AuthFormHeading>パスワードリセット</AuthFormHeading>
              <br />
              <AuthFormInfo>新しいパスワードを入力してください。</AuthFormInfo>
              <br />
              <LoaderWrapper>{isLoadingAuth && <Loading />}</LoaderWrapper>
              <TxField
                id="standard-basic"
                variant="standard"
                placeholder="パスワード"
                type="password"
                name="new_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.new_password}
              />
              {touched.new_password && errors.new_password ? (
                <ErrorMessage>{errors.new_password}</ErrorMessage>
              ) : null}
              <TxField
                id="standard-basic"
                variant="standard"
                placeholder="パスワード(確認用)"
                type="password"
                name="re_new_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.re_new_password}
              />
              {touched.re_new_password && errors.re_new_password ? (
                <ErrorMessage>{errors.re_new_password}</ErrorMessage>
              ) : null}
              <br />
              <AuthFormButton
                isLoading={isLoadingAuth}
                disabled={!isValid}
                ButtonText="更新"
              />
            </div>
          </form>
        </AuthFormWrapper>
      )}
    </Formik>
  );
};

export default ResetPasswordCofirmPage;
