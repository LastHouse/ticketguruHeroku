import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from '../utils/AuthContext';
import Button from '@material-ui/core/Button';
import moment from 'moment/moment.js';
import Moment from 'react-moment';
import 'moment-timezone';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { lightGreen } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  card: {
    padding: theme.spacing(2),
    width: 300,
    height: 300,
    minWidth: 275,
    backgroundColor: 'lightGreen',
  },
  media: {
    height: 140,
  },
}));

export default function SellTickets() {
  const [saleEvent, setSaleEvent] = useState([]);
  const [saleRow, setSaleRow] = useState([]);
  const [eventTicket, setEventTicket] = useState([]);
  const [ticket, setTicket] = useState([]);
  const { auth } = useAuthContext();
  const classes = useStyles();

  //LIPPUJEN HAKU

  useEffect(() => {
    const fetchEventTickets = () => {
      fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/eventTickets', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setEventTicket(data._embedded.eventTickets));
    };
    fetchEventTickets();
  }, [auth.token]);

  // 1 -------------------------------------------------------

  const getSaleEvent = () => {
    fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/saleEvents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'https://rbmk-ticketguru-backend.herokuapp.com/api/users/3',
      }),
    })
      .then((response) => response.json())
      .then((data) => setSaleEvent(data))
      .catch((err) => console.error(err));
  };

  // 2 -------------------------------------------------------

  const getSaleRow = () => {
    fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/saleRows', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTicket:
          'https://rbmk-ticketguru-backend.herokuapp.com/api/eventTickets/3',
        saleEvent:
          'https://rbmk-ticketguru-backend.herokuapp.com/api/saleEvents/2',
        count: 1,
        discount: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => setSaleRow(data))
      .catch((err) => console.error(err));
  };

  // 3 -------------------------------------------------------

  const getTicket = () => {
    fetch(saleRow._links.tickets.href, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTicket(data._embedded.tickets))
      .catch((err) => console.error(err));
  };

  // -------------------------------------------------------

  function List({ list }) {
    if (!list) {
      return null;
    }
    if (!list.length) {
      return <p>Sorry, the list is empty.</p>;
    }
    return (
      <div>
        {list.map((item) => (
          <Item key={item.checksum} item={item} />
        ))}
      </div>
    );
  }

  function Item({ item }) {
    return <li>{item.checksum}</li>;
  }

  // -------------------------------------------------------

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Grid item xs={12} style={{ margin: 20 }}>
          <p>Sale event created: </p>

          {saleEvent.created === undefined
            ? ''
            : moment(saleEvent.created).format('DD/MM/YYYY  HH:mm')}
        </Grid>
        <Grid item xs={12} style={{ margin: 20 }}>
          <p>Tickets bought: </p>
          <List list={ticket} />
        </Grid>

        {eventTicket.map((item) => (
          <Card
            style={{
              backgroundColor: '#98FB98',
            }}
            key={item.created}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Price: {item.price}
                </Typography>
                <Divider />
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={getSaleEvent}
                color="secondary"
                variant="contained"
                size="small"
              >
                Start
              </Button>

              <Button
                onClick={getSaleRow}
                color="primary"
                variant="contained"
                size="small"
              >
                Buy
              </Button>

              <Button
                onClick={getTicket}
                color="default"
                variant="contained"
                size="small"
              >
                Print
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
