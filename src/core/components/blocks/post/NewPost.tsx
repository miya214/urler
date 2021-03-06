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

import { selectFolder } from '../../../stores/slices/folder/folderSlice';

import {
  selectIsLoadingPost,
  selectOpenNewPost,
  selectPostErrorMessages,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncCreatePost,
  resetOpenNewPost,
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
                      '?????????????????????????????????????????????????????????????????????????????????????????????'
                    )
                  );
                  dispatch(resetIsAuth());
                }
              }
            }
            if (fetchAsyncCreatePost.fulfilled.match(result)) {
              dispatch(resetPostErrorMessage());
              dispatch(setInfoMessage(`${values.name}?????????????????????`));
              dispatch(setIsExistInfoMessage());
              dispatch(resetOpenNewPost());
            }
            dispatch(fetchPostEnd());
          }}
          validationSchema={Yup.object().shape({
            url: Yup.string()
              .required('URL???????????????????????????')
              .matches(/https?:\/\/([a-z]{1,}\.|)/, 'URL?????????????????????????????????')
              .max(300, 'URL???300???????????????????????????????????????'),
            name: Yup.string()
              .required('?????????????????????????????????')
              .max(40, '?????????40???????????????????????????????????????'),
            text: Yup.string().max(
              150,
              '????????????150???????????????????????????????????????'
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
                  label="??????"
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
                  label="??????"
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
                    ???????????????
                  </CancelButton>
                  <SubmitButton
                    isLoading={isLoadingPost}
                    disabled={!isValid}
                    ButtonText="??????"
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
