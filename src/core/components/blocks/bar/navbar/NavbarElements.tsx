import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import AuthButton from '../../../atoms/Buttons/AuthButton';

const bgColor = '#fdfdfd';
const borderColor = '#f9f9f9';
const iconColor = '#79BD9A';
const iconColorHover = '#00ff00';
const txColor = '#79BD9A';
const mainColor = '#00ff00';

export const NavBarWrapper = styled.div`
  background-color: ${bgColor};
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  border-bottom: 4px solid ${borderColor};
  box-shadow: 0px 0px 3px 0px;
`;

export const TopBarLeftItems = styled.div`
  display: flex;
  line-height: 60px;
`;

export const MenuBars = styled.div`
  margin-left: 15px;
  margin-top: 10px;
  font-size: 2rem;
  background: none;
  cursor: pointer;
  z-index: 100;
  & svg {
    transition: 0.3s;
  }
  &:hover {
    & svg {
      color: ${mainColor} !important;
    }
  }
`;

export const AppLogo = styled(Link)`
  color: ${iconColor};
  margin-left: 20%;
  font-size: 20px;
  margin-top: 7px;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: ${iconColorHover};
  }
`;

export const TopBarRightItems = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 500px;
  margin-right: 30px;
  @media only screen and (max-width: 767px) {
    width: 200px;
    margin-right: 15px;
  }
`;

export const TopBarProfile = styled(Link)`
  color: ${txColor};
  font-size: 12px;
  text-align: right;
  margin-right: 40px;
  width: 300px;
  line-height: 36px;
  transition: 0.3s;

  &:hover {
    color: ${mainColor} !important;
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export const TopBarProfileIconLink = styled(Link)`
  display: inline-block;
  padding-top: 5px;
  margin-right: 20px;

  @media screen and (min-width: 767px) {
    display: none;
  }
`;

export const ProfileIcon = styled(CgProfile)`
  width: 25px;
  height: 25px;
  color: ${iconColor} !important;
  transition: 0.3s;
  &:hover {
    color: ${mainColor} !important;
  }
`;

export const SignInLink = styled(Link)`
  color: ${txColor};
  font-size: 15px;
  line-height: 36px;
  transition: 0.3s;
  text-align: right;
  margin-right: 40px;

  &:hover {
    color: ${mainColor} !important;
  }
  @media only screen and (max-width: 767px) {
    margin-right: 20px;
  }
`;

export const Button = styled(AuthButton)`
  line-height: 36px;
`;
// #060b26
export const NavMenu = styled.nav`
  background-color: ${bgColor};
  border-right: 4px solid ${borderColor};
  box-shadow: 0px 2px 10px;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 850ms;
  z-index: 2000;
  &.active {
    left: 0;
    transition: 350ms;
  }
`;

export const NavMenuItems = styled.ul`
  width: 100%;
`;

export const NavBarToggle = styled.li`
  background-color: ${bgColor};
  width: 100%;
  padding-top: 10px;
  height: 60px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const NavText = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${txColor};
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;
  transition: 0.2s;

  &:hover {
    background-color: ${mainColor};
    color: ${bgColor};
  }

  &.active {
    background-color: ${mainColor};
    color: ${bgColor};
  }
  & span {
    padding-left: 10px;
  }
`;
