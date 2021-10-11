import { VFC, ReactElement } from 'react';

import { Modal } from '@material-ui/core';
import { Backdrop, Fade } from '@mui/material';

import ModalBox from './ModalElements';

const ModalWrapper: VFC<{
  isOpen: boolean;
  closeFunc: () => void;
  children: ReactElement;
}> = ({ isOpen, closeFunc, children }) => (
  <Modal
    open={isOpen}
    keepMounted
    onClose={closeFunc}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={isOpen}>
      <ModalBox>{children}</ModalBox>
    </Fade>
  </Modal>
);

export default ModalWrapper;
