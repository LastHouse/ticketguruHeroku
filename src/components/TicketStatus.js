import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuthContext } from '../utils/AuthContext';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function TicketStatus(props) {
  const { auth } = useAuthContext();
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchStatus();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchStatus = () => {
    fetch(props.ticket._links.ticketStatus.href, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
      .then(response => response.json())
      .then(data => setStatus(data));
  };

  return (
    <div>
      <Tooltip title="Status">
        <IconButton onClick={() => handleClickOpen()}>
          <AnnouncementIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ticket Status</DialogTitle>

        <DialogContent>
          <DialogContentText> {status.name}</DialogContentText>
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
