import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Switch } from '@material-ui/core';

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
  selectIsLoadingFolder,
  selectOpenEditFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncUpdateFolder,
  resetOpenEditFolder,
  selectFolder,
  resetFolderErrorMessage,
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
            if (fetchAsyncUpdateFolder.fulfilled.match(result)) {
              dispatch(resetFolderErrorMessage());
              dispatch(setInfoMessage('?????????????????????????????????'));
              dispatch(setIsExistInfoMessage());
            }
            dispatch(fetchFolderEnd());
            dispatch(resetOpenEditFolder());
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required('??????????????????????????????????????????')
              .max(20, '??????????????????20???????????????????????????????????????'),
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
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
                <SwitchLabel>????????????</SwitchLabel>
                <SwitchSelect>
                  <SwitchSelectText className={!values.public ? 'active' : ''}>
                    ?????????
                  </SwitchSelectText>
                  <Switch
                    color="default"
                    checked={values.public}
                    onChange={handleChange}
                    name="public"
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <SwitchSelectText className={values.public ? 'active' : ''}>
                    ??????
                  </SwitchSelectText>
                </SwitchSelect>
              </SwitchWrapper>
              <br />
              <BottomActions>
                <CancelButton
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(resetOpenEditFolder());
                  }}
                >
                  ???????????????
                </CancelButton>
                <SubmitButton
                  isLoading={isLoadingFolder}
                  disabled={!isValid}
                  ButtonText="??????"
                  clickFunc={handleSubmit}
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
