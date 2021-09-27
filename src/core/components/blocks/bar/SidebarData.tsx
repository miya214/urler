import { VFC } from 'react';
import { FaBars } from 'react-icons/fa';
import {
  AiFillHome,
  AiOutlineClose,
  AiOutlineGlobal,
  AiFillStar,
} from 'react-icons/ai';
import { RiGlobalFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'Top',
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
  top: 0,
  mypage: 1,
  global: 2,
  favorite: 3,
};
