import { VFC } from 'react';
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

import {
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncUpdatePost,
  resetOpenEditPost,
  selectIsLoadingPost,
  selectOpenEditPost,
  selectPostErrorMessages,
  resetPostErrorMessage,
} from '../../../stores/slices/post/postSlice';

import ModalWrapper from '../../atoms/Modal/ModalWrapper';
import {
  TxField,
  ErrorMessage,
  BottomActions,
  CancelButton,
} from '../../atoms/Form/FormElements';

import SubmitButton from '../../atoms/Buttons/SubmitButton';
import ErrorAlert from '../../atoms/Alert/ErrorAlert';

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
  const postErrorMessages = useSelector(selectPostErrorMessages);

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
            if (fetchAsyncUpdatePost.fulfilled.match(result)) {
              dispatch(resetPostErrorMessage());
              dispatch(setInfoMessage(`${values.name}を更新しました`));
              dispatch(setIsExistInfoMessage());
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
            <>
              {postErrorMessages.map((message) => (
                <ErrorAlert text={message} key={message} />
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
                      dispatch(resetOpenEditPost());
                    }}
                  >
                    キャンセル
                  </CancelButton>
                  <SubmitButton
                    isLoading={isLoadingPost}
                    disabled={!isValid}
                    ButtonText="更新"
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

export default EditPost;
