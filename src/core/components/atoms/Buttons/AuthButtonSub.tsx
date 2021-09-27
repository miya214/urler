import { VFC, MouseEvent } from 'react';

import { AuthBtn } from './ButtonDesign';

const AuthButton: VFC<{
  clickFunc: (e: MouseEvent<HTMLElement>) => void;
  ButtonText: string;
}> = ({ clickFunc, ButtonText }) => (
  <AuthBtn onClick={clickFunc}>{ButtonText}</AuthBtn>
);

export default AuthButton;
