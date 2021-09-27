import { VFC, ReactNode, ReactElement } from 'react';
import { Modal, Box } from '@material-ui/core';
import ModalBox from './ModalElements';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '60%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const ModalWrapper: VFC<{
  isOpen: boolean;
  closeFunc: () => void;
  children: ReactElement;
}> = ({ isOpen, closeFunc, children }) => (
  <Modal
    open={isOpen}
    onClose={closeFunc}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <ModalBox>{children}</ModalBox>
  </Modal>
);

export default ModalWrapper;
