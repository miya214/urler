import { VFC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { AppDispatch } from '../../../stores/app/store';

import {
  resetIsAuth,
  setAuthErrorMessage,
} from '../../../stores/slices/auth/authSlice';

import { selectMyProfile } from '../../../stores/slices/profile/profileSlice';

import {
  selectFolder,
  selectIsLoadingFolder,
  selectOpenDeleteFolder,
  setOpenEditFolder,
  setOpenDeleteFolder,
  resetOpenDeleteFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetFolder,
  fetchAsyncDeleteFolder,
} from '../../../stores/slices/folder/folderSlice';

import {
  setInfoMessage,
  setIsExistInfoMessage,
} from '../../../stores/slices/message/messageSlice';

import { selectActiveIndex } from '../../../stores/slices/bar/barSlice';

import CommonDialog from '../../atoms/Dialog';
import TopLinkButton from '../../atoms/Buttons/TopLinkButton';
import Loading from '../../atoms/Loader';

import EditFolder from '../../blocks/folder/EditFolder';
import Posts from '../../blocks/post/Posts';
import { SidebarData } from '../../blocks/bar/SidebarData';
import MainHeader from '../../blocks/main/MainHeader';
import { LoadingWrapper } from '../../blocks/main/MainElements';
import FolderDetailInfo from '../../blocks/folder/FolderDetailInfo';

interface URLParams {
  id: string;
}

const FolderDetail: VFC = () => {
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
