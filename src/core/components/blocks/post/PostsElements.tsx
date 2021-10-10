import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import { Accordion } from '@material-ui/core';

export const PostListItemName = styled.p`
  font-size: 16px;
  padding: 15px 20px !important;
  color: #79bd9a;
`;

export const PostListItemText = styled.p`
  font-size: 13px;
  margin-top: 15px;
  padding: 0 10px;
  color: #454545;
`;

export const PostListWrapper = styled.div``;

export const PostListItemWithCheckBox = styled.div`
  display: flex;
  justify-content: stretch;
  overflow: hidden;
`;

export const WCPostListItem = styled.div`
  flex: auto;
`;

export const PostCheckBox = styled.input`
  width: 30px;
  align-items: stretch;
`;

export const PostCheckBoxWrapper = styled.div`
  width: 0px;
  text-align: center;
  line-height: 74px;
  transition: 0.3s;

  &.active {
    width: 40px;
  }
`;

export const PostEditButtonWrapper = styled.div`
  width: 0px;
  line-height: 74px;
  transition: 0.3s;

  & button {
    opacity: 0;
    transition: 0.3s;
  }

  &.active {
    width: 40px;
    & button {
      opacity: 1;
    }
  }
`;

export const PostSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  line-height: 70px;
`;

export const PostCreateIconButton = styled(IconButton)`
  display: none !important;
  &.active {
    display: block !important;
  }
`;

export const PostCreateAndSelectDeleteButton = styled.button`
  appearance: none;
  border: none;
  border-radius: 5px;
  display: block;
  position: relative;
  width: 100%;
  padding: 0.6em;
  text-align: center;
`;

export const PostCreateButton = styled.button`
  appearance: none;
  border: none;
  border-radius: 5px;
  position: relative;
  color: #79bd9a;
  width: 100%;
  padding: 0.6em;
  text-align: center;
  cursor: pointer;
  display: none;
  font-size: 15px;
  transition: 0.3s;
  &.active {
    display: block;
  }
  &:hover {
    color: #00ff00;
  }
`;

export const PostSelectDeleteButton = styled.button`
  appearance: none;
  border: none;
  border-radius: 5px;
  position: relative;
  color: red;
  width: 100%;
  padding: 0.6em;
  text-align: center;
  cursor: pointer;
  display: none;
  &.active {
    display: block;
  }
  &:disabled {
    color: #ef9a9a;
    cursor: default;
  }
`;

export const PostAccordion = styled(Accordion)``;
