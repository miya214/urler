import { VFC, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppDispatch } from '../../../stores/app/store';

import {
  resetIsAuth,
  setAuthErrorMessage,
} from '../../../stores/slices/auth/authSlice';

import {
  setInfoMessage,
  setIsExistInfoMessage,
} from '../../../stores/slices/message/messageSlice';

import { selectFolder } from '../../../stores/slices/folder/folderSlice';

import {
  selectIsLoadingPost,
  selectOpenNewPost,
  selectPostErrorMessages,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncCreatePost,
  resetOpenNewPost,
  setPostErrorMessage,
  resetPostErrorMessage,
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
import ErrorAlert from '../../atoms/Alert/ErrorAlert';

const NewPost: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const folder = useSelector(selectFolder);
  const isLoadingPost = useSelector(selectIsLoadingPost);
  const openNewPost = useSelector(selectOpenNewPost);
  const postErrorMessages = useSelector(selectPostErrorMessages);

  return (
    <>
      <ModalWrapper
        isOpen={openNewPost}
        closeFunc={() => {
          dispatch(resetOpenNewPost());
        }}
      >
        <Formik
          initialErrors={{ url: 'required', name: 'required' }}
          initialValues={{
            url: '',
            name: '',
            text: '',
            folder: folder.id,
          }}
          onSubmit={async (values) => {
            dispatch(fetchPostStart());
            const result = await dispatch(fetchAsyncCreatePost(values));
            if (fetchAsyncCreatePost.rejected.match(result)) {
              if (result.payload) {
                if (result.payload.code === 'token_not_valid') {
                  dispatch(
                    setAuthErrorMessage(
                      'アクセストークンの有効期限が切れました。再ログインしてください'
                    )
                  );
                  dispatch(resetIsAuth());
                }
              }
            }
            if (fetchAsyncCreatePost.fulfilled.match(result)) {
              dispatch(resetPostErrorMessage());
              dispatch(setInfoMessage(`${values.name}を作成しました`));
              dispatch(setIsExistInfoMessage());
              dispatch(resetOpenNewPost());
            }
            dispatch(fetchPostEnd());
          }}
          validationSchema={Yup.object().shape({
            url: Yup.string()
              .required('URLを入力してください')
              .matches(/https?:\/\/([a-z]{1,}\.|)/, 'URLの形式が間違っています')
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
            <>
              {postErrorMessages.map((message) => (
                <ErrorAlert text={message} />
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(resetOpenNewPost());
                    }}
                  >
                    キャンセル
                  </CancelButton>
                  <SubmitButton
                    isLoading={isLoadingPost}
                    disabled={!isValid}
                    ButtonText="作成"
                    clickFunc={handleSubmit}
                  />
                </BottomActions>
              </form>
            </>
          )}
        </Formik>
      </ModalWrapper>
    </>
  );
};

export default NewPost;
