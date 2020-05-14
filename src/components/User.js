import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuthContext } from '../utils/AuthContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function User(props) {
  const { auth } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [saleRowUser, setSaleRowUser] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchSaleUser();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchSaleUser = () => {
    fetch(props.saleRow._links.user.href, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setSaleRowUser(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <CssBaseline />
      <Tooltip title="User">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleClickOpen()}
          size="small"
        >
          User from Sale Event
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">User</DialogTitle>

        <DialogContent>
          <List>
            <ListItem>
              <ListItemText> Users name: {saleRowUser.name}</ListItemText>
            </ListItem>
          </List>
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
