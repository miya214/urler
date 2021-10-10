import { VFC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsExistMessage } from '../../../stores/slices/message/messageSlice';

import Message from './Message';

const MessageWrapper: VFC = () => {
  const isExistMessage = useSelector(selectIsExistMessage);
  return <>{isExistMessage && <Message />}</>;
};

export default MessageWrapper;
