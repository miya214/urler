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
