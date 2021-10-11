import { VFC } from 'react';

import Alert from '@mui/material/Alert';

import { ErrorAlertWrapper } from './AlertElements';

const ErrorAlert: VFC<{ text: string }> = ({ text }) => (
  <ErrorAlertWrapper>
    <Alert severity="error">{text}</Alert>
  </ErrorAlertWrapper>
);

export default ErrorAlert;
