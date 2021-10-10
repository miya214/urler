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
import FavoriteButton from '../../atoms/Buttons/FavoriteButton';

import Posts from '../../blocks/post/Posts';

import {
  fetchCredStart,
  fetchCredEnd,
  selectIsAuth,
  selectIsLoadingAuth,
  fetchAsyncLogin,
  setIsAuth,
  resetIsAuth,
  setAuthErrorMessage,
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

import {
  setInfoMessage,
  setIsExistInfoMessage,
} from '../../../stores/slices/message/messageSlice';

import { setIsExistPosts } from '../../../stores/slices/post/postSlice';

import { selectActiveIndex } from '../../../stores/slices/bar/barSlice';
import { SidebarData } from '../../blocks/bar/SidebarData';

import MainHeader from '../../blocks/main/MainHeader';
import { OpenModalBtn } from '../../atoms/Buttons/ButtonDesign';
import { LoadingWrapper } from '../../blocks/main/MainElements';
import TopLinkButton from '../../atoms/Buttons/TopLinkButton';
import FolderDetailInfo from '../../blocks/folder/FolderDetailInfo';
import Loading from '../../atoms/Loader';

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
  const activeIndex = useSelector(selectActiveIndex);

  useEffect(() => {
    const fetchGetFolders = async () => {
      if (folder.id && folder.id === id) {
        return;
      }

      dispatch(fetchFolderStart());
      const result = await dispatch(fetchAsyncGetFolder(id));
      if (fetchAsyncGetFolder.rejected.match(result)) {
        dispatch(
          setAuthErrorMessage(
            'アクセストークンの有効期限が切れました。再ログインしてください'
          )
        );
        dispatch(resetIsAuth());
      }
      // if (isAuth) {
      //   const result = await dispatch(fetchAsyncGetFolder(id));
      //   if (fetchAsyncGetFolder.rejected.match(result)) {
      //     dispatch(
      //       setAuthErrorMessage(
      //         'アクセストークンの有効期限が切れました。再ログインしてください'
      //       )
      //     );
      //     dispatch(resetIsAuth());
      //   }
      // }
      dispatch(fetchFolderEnd());
    };
    fetchGetFolders().catch((e) => {
      console.log(e);
    });
  }, [dispatch, folder.id, id]);

  const deleteFolder = async () => {
    const result = await dispatch(fetchAsyncDeleteFolder({ id: folder.id }));
    if (fetchAsyncDeleteFolder.rejected.match(result)) {
      dispatch(
        setAuthErrorMessage(
          'アクセストークンの有効期限が切れました。再ログインしてください'
        )
      );
      dispatch(resetIsAuth());
    }
    if (fetchAsyncDeleteFolder.fulfilled.match(result)) {
      dispatch(setInfoMessage('フォルダを削除しました'));
      dispatch(setIsExistInfoMessage());
      history.replace(SidebarData[activeIndex].path);
    }
    dispatch(resetOpenDeleteFolder());
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

      <MainHeader
        title={folder.name}
        isHistory
        buttonElem={<TopLinkButton />}
      />
      {!isLoadingFolder ? (
        <FolderDetailInfo
          folder={folder}
          user={myprofile.user}
          openEditFolder={() => {
            dispatch(setOpenEditFolder());
          }}
          openDeleteFolder={() => {
            dispatch(setOpenDeleteFolder());
          }}
        />
      ) : (
        <LoadingWrapper className="loader" key={0}>
          <Loading />
        </LoadingWrapper>
      )}

      {!isLoadingFolder && <Posts />}
    </>
  );
};

export default FolderDetail;
