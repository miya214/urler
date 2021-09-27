import styled from 'styled-components';

import { Modal, Box } from '@material-ui/core';

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 500px;
  transform: translate(-50%, -50%);
  border: 1px solid #79bd9a;
  background-color: #fff;
  padding-top: 20px;
`;

export default ModalBox;
