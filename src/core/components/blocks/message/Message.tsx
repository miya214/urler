import { VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectInfoMessage,
  selectErrorMessage,
  resetInfoMessage,
  resetErrorMessage,
} from '../../../stores/slices/message/messageSlice';

import { AppDispatch } from '../../../stores/app/store';

const Message: VFC = () => {
  const infoMessage = useSelector(selectInfoMessage);
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch: AppDispatch = useDispatch();
  const clickInfoButton = () => {
    dispatch(resetInfoMessage());
  };
  const clickErrorButton = () => {
    dispatch(resetErrorMessage());
  };

  return (
    <>
      {infoMessage && (
        <div>
          <h1>{infoMessage}</h1>
          <button type="button" onClick={clickInfoButton}>
            確認
          </button>
        </div>
      )}
      {errorMessage && (
        <div>
          <h1>{errorMessage}</h1>
          <button type="button" onClick={clickErrorButton}>
            確認
          </button>
        </div>
      )}
    </>
  );
};

export default Message;
