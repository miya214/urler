import { VFC, MouseEvent } from 'react';

import { Button } from '@mui/material';

const AuthButton: VFC<{
  clickFunc: (e: MouseEvent<HTMLElement>) => void;
  ButtonText: string;
}> = ({ clickFunc, ButtonText }) => (
  <Button variant="contained" onClick={clickFunc}>
    {ButtonText}
  </Button>
);

export default AuthButton;
