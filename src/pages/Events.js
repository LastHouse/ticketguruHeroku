import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  table: {
    minWidth: 650,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const Events = () => {
  const classes = useStyles();
  const { auth } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [eventTickets, setEventTickets] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = () => {
      fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/events', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setLinks(data._embedded.events))
        .catch((err) => console.error(err));
    };
    fetchLinks();
  }, [auth.token]);

  console.log(links);

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
    <div className="events">
      Hiihaa!
      <ul>
        {events.map((event) => (
          <li key={event.name}>{event.name}</li>
        ))}
      </ul>
      <br></br>
      <ul>
        {links.map((link) => (
          <li key={link._links.venue.href}>{link._links.venue.href}</li>
        ))}
      </ul>
    </div>
  );
};
export default Events;
