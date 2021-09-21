import { VFC, useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useParams, useHistory, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import { AppDispatch } from '../../../stores/app/store';

import EditFolder from '../../blocks/folder/EditFolder';
import CommonDialog from '../../atoms/Dialog';
import FavoriteButton from '../../atoms/FavoriteButton';

import Posts from '../../blocks/post/Posts';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsAuth,
  selectIsLoadingAuth,
  fetchAsyncLogin,
  setIsAuth,
  resetIsAuth,
} from '../../../stores/slices/auth/authSlice';

import { selectMyProfile } from '../../../stores/slices/profile/profileSlice';

import {
  selectMyFolders,
  selectFolder,
  selectIsLoadingFolder,
  selectIsSetFolder,
  selectOpenDeleteFolder,
  setOpenEditFolder,
  setOpenDeleteFolder,
  resetOpenDeleteFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetMyFolders,
  fetchAsyncGetFolders,
  fetchAsyncGetFolder,
  fetchAsyncDeleteFolder,
} from '../../../stores/slices/folder/folderSlice';
import { setIsExistPosts } from '../../../stores/slices/post/postSlice';

interface URLParams {
  id: string;
}

const FolderDetail: VFC = () => {
  const isAuth = useSelector(selectIsAuth);
  const { id } = useParams<URLParams>();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const myprofile = useSelector(selectMyProfile);
  const folder = useSelector(selectFolder);
  const isLoadingFolder = useSelector(selectIsLoadingFolder);
  const openDeleteFolder = useSelector(selectOpenDeleteFolder);

  useEffect(() => {
    const fetchGetFolders = async () => {
      if (folder.id && folder.id === id) {
        return;
      }
      // dispatch(setIsExistPosts());
      if (isAuth) {
        dispatch(fetchFolderStart());
        const result = await dispatch(fetchAsyncGetFolder(id));
        if (fetchAsyncGetFolder.rejected.match(result)) {
          dispatch(resetIsAuth());
          return;
        }
        dispatch(fetchFolderEnd());
      }
    };
    fetchGetFolders().catch((e) => {
      console.log(e);
    });
  }, [dispatch, folder.id, id, isAuth]);

  const deleteFolder = async () => {
    await dispatch(fetchAsyncDeleteFolder({ id: folder.id }));
    dispatch(resetOpenDeleteFolder());
    history.replace('/');
  };

  return (
    <>
      {myprofile.user === folder.user && (
        <div>
          <CommonDialog
            msg="本当に削除しますか？"
            isOpen={openDeleteFolder}
            doYes={deleteFolder}
            doNo={() => {
              dispatch(resetOpenDeleteFolder());
            }}
          />
          {!isLoadingFolder && <EditFolder />}
        </div>
      )}
      <CommonDialog
        msg="本当に削除しますか？"
        isOpen={openDeleteFolder}
        doYes={deleteFolder}
        doNo={() => {
          dispatch(resetOpenDeleteFolder());
        }}
      />
      {!isLoadingFolder && <EditFolder />}
      {!isLoadingFolder ? <div>{folder.name}</div> : <CircularProgress />}

      {myprofile.user === folder.user && (
        <div>
          <button
            type="button"
            onClick={() => {
              dispatch(setOpenEditFolder());
            }}
          >
            編集
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(setOpenDeleteFolder());
            }}
          >
            削除
          </button>
        </div>
      )}

      {!isLoadingFolder && (
        <FavoriteButton id={folder.id} favorite={folder.favorite} />
      )}

      {!isLoadingFolder && <Posts />}
    </>
  );
};

export default FolderDetail;
