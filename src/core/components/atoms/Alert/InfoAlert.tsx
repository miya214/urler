import { VFC, SyntheticEvent, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { AppDispatch } from '../../../stores/app/store';

import {
  selectInfoMessage,
  selectIsExistMessage,
  resetIsExistInfoMessage,
  resetInfoMessage,
} from '../../../stores/slices/message/messageSlice';

const InfoAlert: VFC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isExistMessage = useSelector(selectIsExistMessage);
  const infoMessage = useSelector(selectInfoMessage);

  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetInfoMessage());
    dispatch(resetIsExistInfoMessage());
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        open={isExistMessage}
        autoHideDuration={2000}
        onClose={handleClose}
        message={infoMessage}
        action={action}
      />
    </>
  );
};

export default InfoAlert;
