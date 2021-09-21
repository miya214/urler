import { useEffect, useState, MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const CommonDialog: React.FunctionComponent<{
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
          No
        </Button>
        <Button onClick={() => doYes()} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
export default CommonDialog;
