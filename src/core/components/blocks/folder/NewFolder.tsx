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
  selectOpenNewFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncCreateFolder,
  resetOpenNewFolder,
  selectFolderErrorMessages,
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
import ErrorAlert from '../../atoms/Alert/ErrorAlert';

const NewFolder: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingFolder = useSelector(selectIsLoadingFolder);
  const openNewFolder = useSelector(selectOpenNewFolder);
  const folderErrorMessages = useSelector(selectFolderErrorMessages);

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
            if (fetchAsyncCreateFolder.fulfilled.match(result)) {
              dispatch(resetFolderErrorMessage());
              dispatch(setInfoMessage('?????????????????????????????????'));
              dispatch(setIsExistInfoMessage());
            }
            dispatch(fetchFolderEnd());
            dispatch(resetOpenNewFolder());
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
            <>
              {folderErrorMessages.map((message) => (
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
                  label="???????????????"
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
                    <SwitchSelectText
                      className={!values.public ? 'active' : ''}
                    >
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
                      dispatch(resetOpenNewFolder());
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
            </>
          )}
        </Formik>
      </ModalWrapper>
    </>
  );
};

export default NewFolder;
