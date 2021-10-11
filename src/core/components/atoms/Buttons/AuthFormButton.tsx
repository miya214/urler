import { VFC } from 'react';

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
