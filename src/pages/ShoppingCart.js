import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from '../utils/AuthContext';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CartContext } from '../utils/CartContext';
import { TicketContext } from '../utils/TicketContext';
import axios from 'axios';
import { QRCode } from 'react-qr-svg';
import Button from '@material-ui/core/Button';
import moment from 'moment/moment.js';
import 'moment-timezone';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 500,
  },
}));

export default function ShoppingCart() {
  const classes = useStyles();
  const { auth } = useAuthContext();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [newTicket, setNewTicket] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const [ticket, setTicket] = useContext(TicketContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const options = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    },
  };

  // TÄSSÄ TULISI ARRAY.MAP(CART), JOTTA SALEROWILLE MENEE USEAMPI LIPPU!!!

  // LISÄÄ SETCART MUKANA TICKET._LINKS.SELF.HREF??

  function sellTicket() {
    axios
      .post(
        'https://rbmk-ticketguru-backend.herokuapp.com/api/saleEvents',

        {
          user: 'https://rbmk-ticketguru-backend.herokuapp.com/api/users/3',
        },
        options
      )
      .then((saleEvent) => {
        return axios
          .post(
            'https://rbmk-ticketguru-backend.herokuapp.com/api/saleRows',
            {
              eventTicket: ticket._links.self.href,
              saleEvent: saleEvent.data._links.self.href,
              count: 1,
              discount: 0,
            },
            options
          )
          .then((saleRow) => {
            return axios.get(saleRow.data._links.tickets.href, options);
          })
          .then((response) => {
            setNewTicket(response.data._embedded.tickets);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            setCart([]);
          });
      });
  }

  const receipt = () => {
    console.log(newTicket.map((item) => item.checksum));
    setNewTicket([]);
  };

  function Content({ list }) {
    if (!list) {
      return null;
    }
    if (cart.length === 0) {
      return (
        <div>
          <p>Nothing here...</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Items in cart : {cart.length}</p>
          {cart.map((item, i) => (
            <div key={i}>
              <p>{cart[i].name}</p>
              <p>{moment(cart[0].dateTime).format('DD/MM/YYYY HH:mm')}</p>
            </div>
          ))}
          <p>Total price: {totalPrice}</p>
        </div>
      );
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.content}>
        <Container
          position="absolute"
          maxWidth="lg"
          className={classes.container}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={7}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Shopping Cart{' '}
                  </Typography>
                  <Content list={cart} />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={sellTicket}
                    color="secondary"
                  >
                    Buy
                  </Button>
                </React.Fragment>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Tickets bought{' '}
                  </Typography>
                  {newTicket.map((item, i) => (
                    <div key={i} className={classes.paper}>
                      <Typography
                        component="h4"
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        Ticket {i + 1}
                      </Typography>
                      <p>Checksum: {item.checksum}</p>
                      <QRCode
                        className={classes.paper}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        style={{ width: 250 }}
                        value={item.checksum}
                      />

                      <Button
                        size="small"
                        variant="contained"
                        onClick={receipt}
                        color="secondary"
                      >
                        Print
                      </Button>
                    </div>
                  ))}
                </React.Fragment>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}