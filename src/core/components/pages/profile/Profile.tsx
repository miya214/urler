import { VFC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, IconButton } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppDispatch } from '../../../stores/app/store';

import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import {
  selectMyProfile,
  setOpenProfile,
} from '../../../stores/slices/profile/profileSlice';

import {
  selectNumOfFavorite,
  selectMyFolders,
  selectIsLoadingFolder,
  setHasMyFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetMyFolders,
} from '../../../stores/slices/folder/folderSlice';

import { setActiveIndex } from '../../../stores/slices/bar/barSlice';

import EditProfile from '../../blocks/profile/EditProfile';
import MainHeader from '../../blocks/main/MainHeader';
import {
  OpenModalBtn,
  OpenEditProfileBtn,
} from '../../atoms/Buttons/ButtonDesign';
import {
  ProfileItemWrapper,
  ProfileLeftItem,
  ProfileRightItems,
  ProfileInfoContent,
  ProfileTableCell,
  ProfileTableHead,
  OtherInfoContent,
  OtherInfoTableContainer,
  OtherInfoTable,
  EditButtonWrapper,
} from './ProfileElements';

import TopLinkButton from '../../atoms/Buttons/TopLinkButton';

const Profile: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectMyProfile);
  const myfolders = useSelector(selectMyFolders);
  const numOfFavorite = useSelector(selectNumOfFavorite);

  useEffect(() => {
    dispatch(setActiveIndex(1));
  }, [dispatch]);

  return (
    <>
      <EditProfile />
      <MainHeader
        title="MyPage"
        isHistory={false}
        buttonElem={<TopLinkButton />}
      />
      <ProfileItemWrapper>
        <ProfileLeftItem>
          <ProfileInfoContent>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <ProfileTableHead align="left" colSpan={2}>
                      プロフィール
                    </ProfileTableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <ProfileTableCell align="left">ユーザーID</ProfileTableCell>
                    <ProfileTableCell align="left">
                      {profile.user}
                    </ProfileTableCell>
                  </TableRow>
                  <TableRow>
                    <ProfileTableCell align="left">
                      ニックネーム
                    </ProfileTableCell>
                    <ProfileTableCell align="left">
                      {profile.nickname}
                    </ProfileTableCell>
                  </TableRow>
                  <TableRow>
                    <ProfileTableCell align="left">
                      アカウントの作成
                    </ProfileTableCell>
                    <ProfileTableCell align="left">
                      {profile.created_on}
                    </ProfileTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ProfileInfoContent>
        </ProfileLeftItem>
        <ProfileRightItems>
          <OtherInfoContent>
            <OtherInfoTableContainer>
              <OtherInfoTable aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <ProfileTableHead align="left" colSpan={2}>
                      その他
                    </ProfileTableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <ProfileTableCell align="left">
                      お気に入りされたフォルダの数
                    </ProfileTableCell>
                    <ProfileTableCell align="left">
                      {numOfFavorite}
                    </ProfileTableCell>
                  </TableRow>
                </TableBody>
              </OtherInfoTable>
            </OtherInfoTableContainer>
          </OtherInfoContent>
          <EditButtonWrapper>
            <OpenEditProfileBtn
              type="button"
              onClick={() => {
                dispatch(setOpenProfile());
              }}
            >
              編集
            </OpenEditProfileBtn>
          </EditButtonWrapper>
        </ProfileRightItems>
      </ProfileItemWrapper>
    </>
  );
};

export default Profile;
