import { VFC, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  MainHeaderItemWrapper,
  MainHeaderLeftItems,
  MainHeaderTitle,
} from './MainElements';

import { OpenModalBtn } from '../../atoms/Buttons/ButtonDesign';

const MainHeader: VFC<{
  title: string;
  isHistory: boolean;
  path: string;
  buttonText: string;
  clickOpenModalFunc: () => void;
}> = ({ title, isHistory, path, buttonText, clickOpenModalFunc }) => {
  const history = useHistory();

  return (
    <MainHeaderItemWrapper>
      <MainHeaderLeftItems>
        {isHistory && (
          <IconButton
            aria-label="back"
            onClick={() => {
              history.push(path);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <MainHeaderTitle>{title}</MainHeaderTitle>
      </MainHeaderLeftItems>
      <OpenModalBtn onClick={clickOpenModalFunc}>{buttonText}</OpenModalBtn>
    </MainHeaderItemWrapper>
  );
};

export default MainHeader;
