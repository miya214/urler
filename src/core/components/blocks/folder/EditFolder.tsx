import { VFC, useState } from 'react';
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

const EditFolder: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingFolder = useSelector(selectIsLoadingFolder);
  const openEditFolder = useSelector(selectOpenEditFolder);
  const folder = useSelector(selectFolder);

  return (
    <>
      <ModalWrapper
        isOpen={openEditFolder}
        closeFunc={() => {
          dispatch(resetOpenEditFolder());
        }}
      >
        <Formik
          initialErrors={{ name: 'required' }}
          initialValues={{
            id: folder.id,
            name: folder.name,
            public: folder.public,
          }}
          onSubmit={async (values) => {
            dispatch(fetchFolderStart());
            const result = await dispatch(fetchAsyncUpdateFolder(values));
            if (fetchAsyncUpdateFolder.rejected.match(result)) {
              dispatch(resetIsAuth());
              dispatch(resetOpenEditFolder());
              return;
            }
            dispatch(fetchFolderEnd());
            dispatch(resetOpenEditFolder());
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required('フォルダ名を入力してください')
              .max(20, 'フォルダ名は20文字以下で設定してください'),
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
                label="name"
                name="name"
                type="input"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? (
                <ErrorMessage>{errors.name}</ErrorMessage>
              ) : null}
              <SwitchWrapper>
                <SwitchLabel>公開設定</SwitchLabel>
                <SwitchSelect>
                  <SwitchSelectText className={!values.public ? 'active' : ''}>
                    非公開
                  </SwitchSelectText>
                  <Switch
                    color="default"
                    checked={values.public}
                    onChange={handleChange}
                    name="public"
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <SwitchSelectText className={values.public ? 'active' : ''}>
                    公開
                  </SwitchSelectText>
                </SwitchSelect>
              </SwitchWrapper>
              <br />
              <BottomActions>
                <CancelButton
                  onClick={() => {
                    dispatch(resetOpenEditFolder());
                  }}
                >
                  キャンセル
                </CancelButton>
                <SubmitButton
                  isLoading={isLoadingFolder}
                  disabled={!isValid}
                  ButtonText="更新"
                />
              </BottomActions>
            </form>
          )}
        </Formik>
      </ModalWrapper>
    </>
  );
};

export default EditFolder;
