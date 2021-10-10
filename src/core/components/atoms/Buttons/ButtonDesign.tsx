import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

export const AuthBtn = styled.button`
  appearance: none;
  border: none;
  border-radius: 5px;
  display: block;
  position: relative;
  width: 100px;
  padding: 0.6em;
  text-align: center;
  color: #fff;
  background: #79bd9a;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background: #00ff00;
  }
`;

export const SubmitBtn = styled(LoadingButton)`
  appearance: none;
  border: 1px solid #fff !important;
  background: rgba(121, 189, 154) !important;
  color: #fff !important;
  transition: 0.3s;

  &.Mui-disabled {
    background: #dfdfdf !important;
  }

  &:hover {
    background: #00ff00 !important;
  }
`;

export const AuthFormBtn = styled(LoadingButton)`
  appearance: none;
  border: 1px solid #fff !important;
  background: rgba(121, 189, 154) !important;
  color: #fff !important;
  transition: 0.3s;

  display: block !important;
  width: 90%;
  margin: 10px auto !important;

  &.Mui-disabled {
    background: #dfdfdf !important;
  }

  &:hover {
    background: #00ff00 !important;
  }
`;

export const SearchBtn = styled(SubmitBtn)`
  width: 100%;
  margin: 30px 0 20px !important;
`;

export const OpenModalBtn = styled.button`
  appearance: none;
  border: none;
  border-radius: 5px;
  display: block;
  position: relative;
  width: 70px;
  padding: 0.6em;
  text-align: center;
  color: #fff;
  background: #79bd9a;
  transition: 0.3s;
  height: 40px;

  &:hover {
    cursor: pointer;
    background: #00ff00;
  }
`;

export const OpenEditProfileBtn = styled.button`
  appearance: none;
  border: none;
  border-radius: 5px;
  display: block;
  position: relative;
  width: 100%;
  padding: 0.6em;
  text-align: center;
  color: #fff;
  background: #79bd9a;
  transition: 0.3s;
  height: 50px;

  &:hover {
    cursor: pointer;
    background: #00ff00;
  }
`;

export const TopLinkBtn = styled(Link)`
  text-decoration: none;
  color: #79bd9a;
  transition: 0.3s;
  padding-top: 10px;
  &:hover {
    color: #00ff00;
  }
`;
