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
  selectOpenNewFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncCreateFolder,
  resetOpenNewFolder,
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

const NewFolder: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const isLoadingFolder = useSelector(selectIsLoadingFolder);
  const openNewFolder = useSelector(selectOpenNewFolder);

  return (
    <>
      <ModalWrapper
        isOpen={openNewFolder}
        closeFunc={() => {
          dispatch(resetOpenNewFolder());
        }}
      >
        <Formik
          initialErrors={{ name: 'required' }}
          initialValues={{
            name: '',
            public: false,
          }}
          onSubmit={async (values) => {
            dispatch(fetchFolderStart());
            const result = await dispatch(fetchAsyncCreateFolder(values));
            if (fetchAsyncCreateFolder.rejected.match(result)) {
              dispatch(resetIsAuth());
              dispatch(resetOpenNewFolder());
              return;
            }
            dispatch(fetchFolderEnd());
            dispatch(resetOpenNewFolder());
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
                label="フォルダ名"
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
                    dispatch(resetOpenNewFolder());
                  }}
                >
                  キャンセル
                </CancelButton>
                <SubmitButton
                  isLoading={isLoadingFolder}
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

export default NewFolder;
