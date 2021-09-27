import { VFC, MouseEvent } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import { AuthFormBtn } from './ButtonDesign';

const AuthFormButton: VFC<{
  isLoading: boolean;
  disabled: boolean;
  ButtonText: string;
}> = ({ isLoading, disabled, ButtonText }) => (
  <AuthFormBtn
    loading={isLoading}
    disabled={disabled}
    variant="outlined"
    type="submit"
  >
    {ButtonText}
  </AuthFormBtn>
);

export default AuthFormButton;
