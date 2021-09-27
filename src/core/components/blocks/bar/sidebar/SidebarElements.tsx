import styled from 'styled-components';
import { Link } from 'react-router-dom';

const bgColor = '#fdfdfd';
const borderColor = '#f9f9f9';
const iconColor = 'black';
const txColor = 'black';
const mainColor = '#00ff00';

export const SideMenu = styled.div`
  background-color: ${bgColor};
  border-right: 4px solid ${borderColor};
  box-shadow: 0px 1px 3px;
  width: 50px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export const SideMenuItem = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 4px;
  list-style: none;
  height: 60px;
`;

export const MenuItemLink = styled(Link)`
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: 0.3s;
  padding: 0 10px;
  &:hover {
    background-color: ${mainColor};
    & svg {
      color: ${bgColor} !important;
    }
  }
`;

export const MenuItemLinkActive = styled(MenuItemLink)`
  background-color: ${mainColor};
  & svg {
    color: ${bgColor} !important;
  }
`;

export const SideMenuItems = styled.ul`
  width: 100%;
  &:first-child {
    padding-top: 100px;
  }
`;
