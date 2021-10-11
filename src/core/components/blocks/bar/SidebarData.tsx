import { AiFillHome, AiOutlineGlobal, AiFillStar } from 'react-icons/ai';

import { CgProfile } from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'MyFolder',
    path: '/',
    icon: <AiFillHome />,
  },
  {
    title: 'MyPage',
    path: '/mypage',
    icon: <CgProfile />,
  },
  {
    title: 'Global',
    path: '/folder',
    icon: <AiOutlineGlobal />,
  },
  {
    title: 'Favorite',
    path: '/folder/favorite',
    icon: <AiFillStar />,
  },
];

export const BarDataIndex = {
  myfolder: 0,
  mypage: 1,
  global: 2,
  favorite: 3,
};
