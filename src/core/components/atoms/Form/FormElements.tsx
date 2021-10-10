import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

export const TxField = styled(TextField)`
  display: block !important;
  width: 90%;
  margin: 15px auto !important;

  & div {
    width: 100%;
  }
`;

export const SwitchWrapper = styled.div`
  width: 90%;
  margin: 30px auto 10px !important;
`;

export const SwitchLabel = styled.label`
  font-size: 15px;
  color: #636363;
`;

export const SwitchSelect = styled.div`
  display: flex;
`;

export const SwitchSelectText = styled.p`
  font-size: 13px;
  padding: 12px 0px;
  color: #9f9f9f;

  &.active {
    color: #1976d2;
  }
`;

export const SwitchPublic = styled(TextField)``;

export const ErrorMessage = styled.p`
  width: 90%;
  margin: 0 auto;
  color: red;
  font-size: 13px;
`;

export const BottomActions = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #79bd9a;
  padding: 10px 20px;
`;

export const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  color: #79bd9a;
  margin-right: 20px;
  transition: 0.3s;

  &:hover {
    color: #00ff00;
  }
`;

export const AuthFormWrapper = styled.div`
  width: 98%;
  max-width: 500px;
  margin: 30px auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #6d6d6d;
  padding: 60px 40px 30px;
`;

export const AuthFormHeading = styled.h3`
  margin-left: 20px;
`;

export const AuthFormInfo = styled.p`
  margin-left: 20px;
  font-size: 15px;
  @media only screen and (max-width: 767px) {
    font-size: 13px;
  }
`;

export const LoaderWrapper = styled.div`
  width: 100px;
  margin: 10px auto;
  text-align: center;
`;

export const AuthFormBottomLinkWrapper = styled.div`
  text-align: center;
`;

export const AuthFormBottomLink = styled(Link)`
  color: #79bd9a;
  display: block;
  margin: 5px 0;
  transition: 0.3s;

  &:hover {
    color: #00ff00;
  }
`;

export const AuthFormText = styled.p`
  margin-bottom: 20px;
`;
