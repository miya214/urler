import { VFC, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Switch,
} from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';

import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import {
  selectIsLoadingFolder,
  selectOpenEditFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncUpdateFolder,
  resetOpenEditFolder,
  selectFolder,
} from '../../../stores/slices/folder/folderSlice';
import {
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncUpdatePost,
  resetOpenEditPost,
  selectIsLoadingPost,
  selectOpenEditPost,
} from '../../../stores/slices/post/postSlice';

import ModalWrapper from '../../atoms/Modal/ModalWrapper';
import {
  TxField,
  ErrorMessage,
  BottomActions,
  CancelButton,
  SwitchWrapper,
  SwitchSelectText,
  SwitchSelect,
  SwitchLabel,
} from '../../atoms/Form/FormElements';
import SubmitButton from '../../atoms/Buttons/SubmitButton';

const EditPost: VFC<{
  id: string;
  url: string;
  name: string;
  text: string;
  folder: string;
}> = ({ id, url, name, text, folder }) => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingPost = useSelector(selectIsLoadingPost);
  const openEditPost = useSelector(selectOpenEditPost);

  return (
    <>
      <ModalWrapper
        isOpen={openEditPost}
        closeFunc={() => {
          dispatch(resetOpenEditPost());
        }}
      >
        <Formik
          initialErrors={{ url: 'required', name: 'required' }}
          initialValues={{
            id,
            url,
            name,
            text,
            folder,
          }}
          onSubmit={async (values) => {
            dispatch(fetchPostStart());
            const result = await dispatch(fetchAsyncUpdatePost(values));
            if (fetchAsyncUpdatePost.rejected.match(result)) {
              dispatch(resetIsAuth());
              dispatch(resetOpenEditPost());
              return;
            }
            dispatch(fetchPostEnd());
            dispatch(resetOpenEditPost());
          }}
          validationSchema={Yup.object().shape({
            url: Yup.string()
              .required('URLを入力してください')
              .max(300, 'URLは300文字以内で設定してください'),
            name: Yup.string()
              .required('名前を入力してください')
              .max(40, '名前は40文字以内で設定してください'),
            text: Yup.string().max(
              150,
              '説明文は150文字以内で設定してください'
            ),
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
                label="URL"
                name="url"
                type="input"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.url && errors.url ? (
                <ErrorMessage>{errors.url}</ErrorMessage>
              ) : null}
              <TxField
                id="standard-basic"
                variant="standard"
                label="名前"
                name="name"
                type="input"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? (
                <ErrorMessage>{errors.name}</ErrorMessage>
              ) : null}
              <br />
              <TxField
                id="standard-basic"
                variant="standard"
                label="説明"
                name="text"
                type="input"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
              />
              {touched.text && errors.text ? (
                <ErrorMessage>{errors.text}</ErrorMessage>
              ) : null}
              <br />
              <BottomActions>
                <CancelButton
                  onClick={() => {
                    dispatch(resetOpenEditPost());
                  }}
                >
                  キャンセル
                </CancelButton>
                <SubmitButton
                  isLoading={isLoadingPost}
                  disabled={!isValid}
                  ButtonText="作成"
                />
              </BottomActions>
            </form>
          )}
        </Formik>
      </ModalWrapper>
    </>
  );
};

export default EditPost;
