import { VFC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { AppDispatch } from '../../../../stores/app/store';

import {
  selectIsAuth,
  resetIsAuth,
} from '../../../../stores/slices/auth/authSlice';

import {
  setActiveIndex,
  resetActiveIndex,
  selectActiveIndex,
} from '../../../../stores/slices/bar/barSlice';

import { SidebarData } from '../SidebarData';
import {
  SideMenu,
  SideMenuItem,
  SideMenuItems,
  MenuItemLink,
  MenuItemLinkActive,
} from './SidebarElements';

const Sidebar: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const activeIndex = useSelector(selectActiveIndex);
  const isAuth = useSelector(selectIsAuth);

  return (
    <>
      <IconContext.Provider value={{ color: '#A8DBA8' }}>
        {isAuth && (
          <SideMenu>
            <SideMenuItems>
              {SidebarData.map((item, index) => (
                <SideMenuItem key={item.path}>
                  {index === activeIndex ? (
                    <MenuItemLinkActive to={item.path}>
                      {item.icon}
                    </MenuItemLinkActive>
                  ) : (
                    <MenuItemLink
                      to={item.path}
                      onClick={() => dispatch(setActiveIndex(index))}
                    >
                      {item.icon}
                    </MenuItemLink>
                  )}
                </SideMenuItem>
              ))}
            </SideMenuItems>
          </SideMenu>
        )}
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
