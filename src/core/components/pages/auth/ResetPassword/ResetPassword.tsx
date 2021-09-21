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
  fetchAsyncResetPassword,
} from '../../../../stores/slices/auth/authSlice';

const ResetPasswordPage: VFC = () => {
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  return (
    <Formik
      initialErrors={{ email: 'required' }}
      initialValues={{ email: '' }}
      onSubmit={async (values) => {
        dispatch(fetchCredStart());
        const result = await dispatch(fetchAsyncResetPassword(values));

        if (fetchAsyncResetPassword.fulfilled.match(result)) {
          history.push('/password/reset/after');
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
              <br />
              <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
                type="submit"
              >
                送信
              </Button>
              <br />
              <br />
              <Link to="/login">戻る</Link>
              <br />
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default ResetPasswordPage;
