import { VFC, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, IconButton } from '@material-ui/core';
import { AppDispatch } from '../../../stores/app/store';

import {
  selectMyProfile,
  setOpenProfile,
} from '../../../stores/slices/profile/profileSlice';

import {
  selectMyFolders,
  selectFolders,
  selectIsLoadingFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetMyFolders,
  fetchAsyncGetFolders,
} from '../../../stores/slices/folder/folderSlice';

import EditProfile from '../../blocks/profile/EditProfile';

const Profile: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectMyProfile);

  return (
    <>
      <EditProfile />
      <div>{profile.nickname}</div>
      <button
        type="button"
        onClick={() => {
          dispatch(setOpenProfile());
        }}
      >
        編集
      </button>
    </>
  );
};

export default Profile;
