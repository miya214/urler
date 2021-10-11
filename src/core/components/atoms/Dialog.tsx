import { VFC } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

const CommonDialog: VFC<{
  msg: string;
  isOpen: boolean;
  doYes: () => void;
  doNo: () => void;
}> = ({ msg, isOpen, doYes, doNo }) => (
  <div>
    <Dialog
      open={isOpen}
      keepMounted
      onClose={() => doNo()}
      aria-labelledby="common-dialog-title"
      aria-describedby="common-dialog-description"
    >
      <DialogContent>{msg}</DialogContent>
      <DialogActions>
        <Button onClick={() => doNo()} color="primary">
          いいえ
        </Button>
        <Button onClick={() => doYes()} color="primary">
          はい
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
export default CommonDialog;
