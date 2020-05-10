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
import axios from 'axios';
import moment from 'moment/moment.js';
import 'moment-timezone';

export default function SaleRows(props) {
  const { auth } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [saleRows, setSaleRows] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchSaleRow();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    },
  };

  const fetchSaleRow = () => {
    axios
      .get(props.saleEvent._links.saleRows.href, options)
      .then((response) => {
        return axios.get(
          response.data._embedded.saleRows[0]._links.tickets.href,
          options
        );
      })
      .then((res) => {
        setSaleRows(res.data._embedded.tickets);
      })
      .catch((err) => console.error(err));
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
        <DialogTitle id="form-dialog-title">Sale Rows</DialogTitle>

        <DialogContent>
          {saleRows.map((item, i) => (
            <DialogContentText key={i}>
              {moment(item.created).format('DD/MM/YYYY HH:mm')}
              <br></br>
              {item.checksum}
            </DialogContentText>
          ))}
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
