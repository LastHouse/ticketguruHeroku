import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventCard from '../components/EventCard';
import { useAuthContext } from '../utils/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  text: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    elevation: 0,
    spacing: 4,
    alignContent: 'stretch',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const Shop = () => {
  const classes = useStyles();
  const { auth } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [eventTickets, setEventTickets] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsAPI =
        'https://rbmk-ticketguru-backend.herokuapp.com/api/events';
      const evenTicketsAPI =
        'https://rbmk-ticketguru-backend.herokuapp.com/api/eventTickets';

      const getEvents = axios.get(eventsAPI, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const getEventTickets = axios.get(evenTicketsAPI, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      await axios
        .all([getEvents, getEventTickets])
        .then(
          axios.spread((...responses) => {
            const responsesEvents = responses[0].data._embedded.events;
            const responsesEventTickets =
              responses[1].data._embedded.eventTickets;

            setEvents(responsesEvents);
            setEventTickets(responsesEventTickets);
          })
        )
        .catch((errors) => {
          console.error(errors);
        });
    };
    fetchEvents();
  }, [auth.token]);

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        {events.map((item) => (
          <EventCard
            key={item.dateTime}
            name={item.name}
            date={item.dateTime}
            ticketCapacity={item.ticketCapacity}
            info={item.info}
            links={item._links}
          />
        ))}
      </Grid>
    </div>
  );
};
export default Shop;
