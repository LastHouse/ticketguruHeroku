import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import Tooltip from '@material-ui/core/Tooltip';
import { QRCode } from 'react-qr-svg';
import { useAuthContext } from '../utils/AuthContext';

export default function ReadTicket(props) {
  const { auth } = useAuthContext();
  const [open, setOpen] = useState(false);

  const [ticket, setTicket] = useState({
    checkSum: '',
    ticketStatus: ''
  });

  const handleClickOpen = () => {
    setTicket({
      checkSum: props.ticket.checkSum
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markUsed = () => {
    fetch(props.ticket._links.self.href, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ticketStatus: 'http://localhost:8080/api/ticketStatuses/2'
      })
    }).catch(err => console.error(err));
  };

  return (
    <div>
      <Tooltip title="Read">
        <IconButton onClick={() => handleClickOpen()}>
          <SelectAllIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Read Ticket</DialogTitle>
        <DialogContent>
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 256 }}
            value={ticket.checkSum}
          />
        </DialogContent>

        <DialogContent>
          <Button variant="contained" color="secondary" onClick={markUsed}>
            Mark as Used
          </Button>
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
