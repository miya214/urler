import { VFC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

import { AppDispatch } from '../../../../stores/app/store';

import {
  selectIsAuth,
  resetIsAuth,
  setAuthErrorMessage,
} from '../../../../stores/slices/auth/authSlice';

import {
  setInfoMessage,
  setIsExistInfoMessage,
} from '../../../../stores/slices/message/messageSlice';

import {
  resetIsSetFolder,
  fetchFolderStart,
  fetchFolderEnd,
  fetchAsyncGetMyFolders,
} from '../../../../stores/slices/folder/folderSlice';

import {
  fetchProfStart,
  fetchProfEnd,
  fetchAsyncGetMyProf,
  selectMyProfile,
} from '../../../../stores/slices/profile/profileSlice';

import {
  setActiveIndex,
  selectActiveIndex,
} from '../../../../stores/slices/bar/barSlice';

import { SidebarData, BarDataIndex } from '../SidebarData';
import {
  NavBarWrapper,
  TopBarLeftItems,
  MenuBars,
  AppLogo,
  TopBarRightItems,
  TopBarProfile,
  TopBarProfileIconLink,
  SignInLink,
  NavMenu,
  NavMenuItems,
  NavBarToggle,
  NavText,
  NavLink,
  ProfileIcon,
} from './NavbarElements';

import AuthButton from '../../../atoms/Buttons/AuthButtonSub';

const Navbar: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const activeIndex = useSelector(selectActiveIndex);
  const profile = useSelector(selectMyProfile);
  const history = useHistory();
  const [sidebar, setSidebar] = useState<boolean>(false);

  useEffect(() => {
    const getMyProf = async () => {
      dispatch(fetchProfStart());
      const result = await dispatch(fetchAsyncGetMyProf());
      if (fetchAsyncGetMyProf.rejected.match(result)) {
        dispatch(
          setAuthErrorMessage(
            'アクセストークンの有効期限が切れています。再ログインしてください'
          )
        );
        dispatch(resetIsAuth());
        dispatch(fetchProfEnd());
        return;
      }
      if (fetchAsyncGetMyProf.fulfilled.match(result)) {
        dispatch(fetchFolderStart());
        await dispatch(fetchAsyncGetMyFolders());
        dispatch(fetchFolderEnd());
      }
      dispatch(fetchProfEnd());
    };
    if (isAuth) {
      if (!profile.user) {
        getMyProf().catch((e) => {
          console.log(e);
        });
      }
    }
  }, [dispatch, isAuth, profile.user]);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#79BD9A' }}>
        <NavBarWrapper>
          <TopBarLeftItems>
            {isAuth && (
              <MenuBars>
                <FaBars onClick={showSidebar} />
              </MenuBars>
            )}

            <AppLogo to="/">URLer</AppLogo>
          </TopBarLeftItems>
          {isAuth ? (
            <TopBarRightItems>
              <TopBarProfile
                to="/mypage"
                onClick={() => dispatch(setActiveIndex(BarDataIndex.mypage))}
              >
                {profile.nickname}
              </TopBarProfile>
              <TopBarProfileIconLink
                to="/mypage"
                onClick={() => dispatch(setActiveIndex(BarDataIndex.mypage))}
              >
                <ProfileIcon />
              </TopBarProfileIconLink>
              <AuthButton
                clickFunc={() => {
                  localStorage.removeItem('ajt');
                  dispatch(resetIsSetFolder());
                  // dispatch(resetMyFoldersCount());
                  // dispatch(resetFoldersCount());
                  dispatch(setInfoMessage('ログアウトしました'));
                  dispatch(setIsExistInfoMessage());
                  dispatch(resetIsAuth());
                }}
                ButtonText="ログアウト"
              />
            </TopBarRightItems>
          ) : (
            <TopBarRightItems>
              <SignInLink to="/signup">新規登録</SignInLink>
              <AuthButton
                clickFunc={() => {
                  history.push('/login');
                }}
                ButtonText="ログイン"
              />
            </TopBarRightItems>
          )}
          {isAuth && (
            <NavMenu className={sidebar ? 'active' : ''}>
              <NavMenuItems>
                <NavBarToggle>
                  <MenuBars>
                    <AiOutlineClose onClick={showSidebar} />
                  </MenuBars>
                </NavBarToggle>
                {SidebarData.map((item, index) => (
                  <NavText key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        showSidebar();
                        dispatch(setActiveIndex(index));
                      }}
                      className={index === activeIndex ? 'active' : ''}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </NavText>
                ))}
              </NavMenuItems>
            </NavMenu>
          )}
        </NavBarWrapper>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
