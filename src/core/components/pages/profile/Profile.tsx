import { VFC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { AppDispatch } from '../../../stores/app/store';

import {
  selectMyProfile,
  setOpenProfile,
} from '../../../stores/slices/profile/profileSlice';

import { selectNumOfFavorite } from '../../../stores/slices/folder/folderSlice';

import { setActiveIndex } from '../../../stores/slices/bar/barSlice';

import { OpenEditProfileBtn } from '../../atoms/Buttons/ButtonDesign';
import TopLinkButton from '../../atoms/Buttons/TopLinkButton';

import EditProfile from '../../blocks/profile/EditProfile';
import MainHeader from '../../blocks/main/MainHeader';

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

const Profile: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectMyProfile);
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
