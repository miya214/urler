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
  selectIsLoadingProf,
  selectMyProfile,
  selectOpenProfile,
  resetOpenProfile,
  fetchAsyncUpdateProf,
  editNickname,
  selectProfileErrorMessages,
  resetProfileErrorMessage,
} from '../../../stores/slices/profile/profileSlice';

import {
  TxField,
  ErrorMessage,
  BottomActions,
  CancelButton,
} from '../../atoms/Form/FormElements';

import {
  setInfoMessage,
  setIsExistInfoMessage,
} from '../../../stores/slices/message/messageSlice';

import ModalWrapper from '../../atoms/Modal/ModalWrapper';
import SubmitButton from '../../atoms/Buttons/SubmitButton';
import ErrorAlert from '../../atoms/Alert/ErrorAlert';

const EditProfile: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoadingProf = useSelector(selectIsLoadingProf);
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectMyProfile);
  const profileErrorMessages = useSelector(selectProfileErrorMessages);

  return (
    <>
      <ModalWrapper
        isOpen={openProfile}
        closeFunc={() => dispatch(resetOpenProfile())}
      >
        <Formik
          initialErrors={{ nickname: 'required' }}
          initialValues={{ id: profile.id, nickname: profile.nickname }}
          onSubmit={async (values) => {
            dispatch(editNickname(values.nickname));
            const result = await dispatch(fetchAsyncUpdateProf(values));
            if (fetchAsyncUpdateProf.rejected.match(result)) {
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
            if (fetchAsyncUpdateProf.fulfilled.match(result)) {
              dispatch(resetProfileErrorMessage());
              dispatch(setInfoMessage('プロフィールを更新しました'));
              dispatch(setIsExistInfoMessage());
            }

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
            <>
              {profileErrorMessages.map((message) => (
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
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(resetOpenProfile());
                    }}
                  >
                    キャンセル
                  </CancelButton>
                  <SubmitButton
                    isLoading={isLoadingProf}
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

export default EditProfile;
