import { VFC, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import { Button, TextField, IconButton, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../stores/app/store';

import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import {
  selectIsLoadingProf,
  selectMyProfile,
  selectOpenProfile,
  resetOpenProfile,
  fetchProfStart,
  fetchProfEnd,
  fetchAsyncUpdateProf,
  editNickname,
} from '../../../stores/slices/profile/profileSlice';

import ModalWrapper from '../../atoms/Modal/ModalWrapper';
import {
  TxField,
  ErrorMessage,
  BottomActions,
  CancelButton,
} from '../../atoms/Form/FormElements';

import SubmitButton from '../../atoms/Buttons/SubmitButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditProfile: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const isLoadingProf = useSelector(selectIsLoadingProf);
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectMyProfile);

  return (
    <div>
      <ModalWrapper
        isOpen={openProfile}
        closeFunc={() => dispatch(resetOpenProfile())}
      >
        <Formik
          initialErrors={{ nickname: 'required' }}
          initialValues={{ id: profile.id, nickname: profile.nickname }}
          onSubmit={async (values) => {
            dispatch(fetchProfStart());
            dispatch(editNickname(values.nickname));
            const result = await dispatch(fetchAsyncUpdateProf(values));
            if (fetchAsyncUpdateProf.rejected.match(result)) {
              dispatch(resetIsAuth());
              dispatch(resetOpenProfile());
              history.push({
                pathname: '/login',
                state: {
                  from: '/mypage',
                },
              });
              return;
            }
            dispatch(fetchProfEnd());
            dispatch(resetOpenProfile());
          }}
          validationSchema={Yup.object().shape({
            nickname: Yup.string()
              .required('ニックネームを入力してください')
              .max(20, '20文字以下で設定してください'),
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
            <form onSubmit={handleSubmit}>
              <TxField
                id="standard-basic"
                variant="standard"
                label="nickname"
                name="nickname"
                type="input"
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.nickname && errors.nickname ? (
                <ErrorMessage>{errors.nickname}</ErrorMessage>
              ) : null}
              <br />
              <BottomActions>
                <CancelButton
                  onClick={() => {
                    dispatch(resetOpenProfile());
                  }}
                >
                  キャンセル
                </CancelButton>
                <SubmitButton
                  isLoading={isLoadingProf}
                  disabled={!isValid}
                  ButtonText="更新"
                />
              </BottomActions>
            </form>
          )}
        </Formik>
      </ModalWrapper>
    </div>
  );
};

export default EditProfile;
