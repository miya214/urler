import { VFC, MouseEvent } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import { SubmitBtn } from './ButtonDesign';

const SubmitButton: VFC<{
  isLoading: boolean;
  disabled: boolean;
  ButtonText: string;
  clickFunc: () => void;
}> = ({ isLoading, disabled, ButtonText, clickFunc }) => (
  <SubmitBtn
    loading={isLoading}
    disabled={disabled}
    variant="outlined"
    type="button"
    onClick={clickFunc}
  >
    {ButtonText}
  </SubmitBtn>
);

export default SubmitButton;
