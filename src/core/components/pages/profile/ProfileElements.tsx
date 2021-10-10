import styled from 'styled-components';
import { TableContainer, Table, TableCell } from '@mui/material';

export const ProfileItemWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 40px 40px;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const ProfileLeftItem = styled.div`
  flex: 3;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const ProfileRightItems = styled.div`
  flex: 2;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const ProfileInfoContent = styled.div`
  background: #fff;
  box-shadow: 3px 3px 10px #6d6d6d;
`;

export const OtherInfoContent = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px #6d6d6d;
  padding: 20px 16px;
`;

export const OtherInfoContentTitle = styled.p`
  font-size: 18px !important;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  padding-bottom: 18px !important;
`;

export const EditButtonWrapper = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px #6d6d6d;
  padding: 20px 16px;
  margin-top: 40px;
`;

export const ProfileName = styled.div`
  color: black;
`;

export const ProfileTableHead = styled(TableCell)`
  font-size: 18px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
`;

export const ProfileTableCell = styled(TableCell)`
  padding-top: 40px !important;
  padding-bottom: 40px !important;
`;

export const OtherInfoTableContainer = styled(TableContainer)`
  box-shadow: none !important;
`;

export const OtherInfoTable = styled(Table)`
  border-color: white !important;
`;
