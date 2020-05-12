import React, { useState, useContext } from 'react';
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
import { CartContext } from '../utils/CartContext';
import { TicketContext } from '../utils/TicketContext';
import axios from 'axios';

export default function EventTicket(props) {
  const { auth } = useAuthContext();
  const [cart, setCart] = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useContext(TicketContext);
  const [event, setEvent] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchTicket();
    fetchEvent();
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

  // CHECK IF EVENT INVALID === NULL

  function fetchTicket() {
    axios
      .get(props.event._links.eventTickets.href, options)

      .then((response) => {
        setTicket(response.data._embedded.eventTickets[0]);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }

  function fetchEvent() {
    axios
      .get(props.event._links.eventTickets.href, options)
      .then((event) => {
        return axios.get(
          event.data._embedded.eventTickets[0]._links.event.href,
          options
        );
      })

      .then((response) => {
        setEvent(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }

  const addToCart = () => {
    const item = {
      price: ticket.price,
      name: event.name,
      dateTime: event.dateTime,
      ticket: ticket._links.self.href,
      event: ticket._links.event.href,
    };

    setCart((currentCart) => [...currentCart, item]);
  };

  return (
    <div>
      <Tooltip title="Event Tickets">
        <IconButton onClick={() => handleClickOpen()}>
          <SelectAllIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        disableBackdropClick={true}
        position="absolute"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Event Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>{event.name}</DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Ticket Count: {ticket.ticketCount}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Ticket Capacity: {event.ticketCapacity}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText> Price: {ticket.price} €</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Exit
          </Button>
          <Button onClick={addToCart} color="secondary">
            Add to cart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
