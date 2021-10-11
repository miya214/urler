import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconContext } from 'react-icons';

import { AppDispatch } from '../../../../stores/app/store';

import { selectIsAuth } from '../../../../stores/slices/auth/authSlice';

import {
  setActiveIndex,
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
