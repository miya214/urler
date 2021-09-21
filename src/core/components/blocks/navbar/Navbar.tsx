import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import { AppDispatch } from '../../../stores/app/store';

import { resetIsAuth } from '../../../stores/slices/auth/authSlice';

import {
  resetIsSetFolder,
  resetFoldersCount,
  resetMyFoldersCount,
} from '../../../stores/slices/folder/folderSlice';

const Navbar: VFC = () => {
  const hoge = 'hoge';
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>UMA</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/signup">新規登録</NavLink>
        </NavMenu>
        <NavMenu>
          <NavLink to="/folder">フォルダ一覧</NavLink>
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
      </Nav>
    </>
  );
};

export default Navbar;
