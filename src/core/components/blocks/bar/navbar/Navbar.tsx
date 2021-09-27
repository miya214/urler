import { VFC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { AppDispatch } from '../../../../stores/app/store';

import {
  selectIsAuth,
  resetIsAuth,
} from '../../../../stores/slices/auth/authSlice';

import {
  resetIsSetFolder,
  resetFoldersCount,
  resetMyFoldersCount,
} from '../../../../stores/slices/folder/folderSlice';

import {
  fetchProfStart,
  fetchProfEnd,
  fetchAsyncGetMyProf,
  selectMyProfile,
  resetProfile,
} from '../../../../stores/slices/profile/profileSlice';

import {
  setActiveIndex,
  resetActiveIndex,
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
  Button,
  NavMenu,
  NavMenuItems,
  NavBarToggle,
  NavText,
  NavLink,
  ProfileIcon,
} from './NavbarElements';
import logo from '../../../../../logo.svg';

import AuthButton from '../../../atoms/Buttons/AuthButtonSub';

const Navbar: VFC = () => {
  const hoge = 'hoge';
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const activeIndex = useSelector(selectActiveIndex);
  const profile = useSelector(selectMyProfile);
  const history = useHistory();
  const [sidebar, setSidebar] = useState<boolean>(false);

  useEffect(() => {
    const getMyProf = async () => {
      dispatch(fetchProfStart());
      await dispatch(fetchAsyncGetMyProf());
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

            <AppLogo>
              {' '}
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                width="30"
                height="30"
              />
            </AppLogo>
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
                  dispatch(resetMyFoldersCount());
                  dispatch(resetFoldersCount());
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
      {/* <Nav>
        <NavLink to="/">
          <h1>UMA</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/signup">新規登録</NavLink>
        </NavMenu>
        <NavMenu>
          <NavLink to="/folder">フォルダ</NavLink>
        </NavMenu>
        <NavMenu>
          <NavLink to="/folder/favorite">お気に入りフォルダ</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login">ログイン</NavBtnLink>
        </NavBtn>
        <NavBtn />
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('ajt');
            dispatch(resetIsAuth());
            dispatch(resetIsSetFolder());
            dispatch(resetMyFoldersCount());
            dispatch(resetFoldersCount());
            history.push('/login');
          }}
        >
          ログアウト
        </button>
      </Nav> */}
    </>
  );
};

export default Navbar;
