import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import Tooltip from '@material-ui/core/Tooltip';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useAuthContext } from '../utils/AuthContext';

export default function EventType(props) {
  const { auth } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchType();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchType = () => {
    fetch(props.event._links.eventType.href, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setType(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Tooltip title="Event Type">
        <IconButton onClick={() => handleClickOpen()}>
          <SelectAllIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Event Type</DialogTitle>
        <DialogContent>
          <DialogContentText> {type.name}</DialogContentText>
        </DialogContent>

        <DialogContent>
          <DialogContentText> {type.info}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
