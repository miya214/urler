import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemText, Avatar } from '@mui/material';

export const FolderItemLink = styled(Link)`
  text-decoration: none;
`;

export const FList = styled(List)`
  padding: 0 !important;
`;

export const FListItem = styled(ListItem)`
  transition: 0.3s;
  padding: 20px 20px !important;
  &:hover {
    background-color: #f6f6f6 !important;
    & .MuiListItemText-primary {
      color: #00ff00 !important;
    }
  }
`;

export const FListItemText = styled(ListItemText)`
  & .MuiListItemText-primary {
    color: #79bd9a !important;
    transition: 0.3s;
  }
`;

export const FolderAvatar = styled(Avatar)`
  background: #79bd9a !important;
`;

export const FolderDetailInfoWrapper = styled.div`
  margin: 20px 0;
  padding: 10px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px #6d6d6d;
  display: flex;
  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const FolderDetailInfoData = styled.div`
  flex: 5;
  border-right: 1px solid #a7a7a7;
  padding: 10px;
  @media only screen and (max-width: 767px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #a7a7a7;
  }
`;

export const FolderDetailInfoButtons = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const FolderDetailInfoDataTitle = styled.h2`
  color: #454545;
`;

export const FolderDetailInfoDataText = styled.p`
  color: #858585;
  font-size: 13px;
`;
