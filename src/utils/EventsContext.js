import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../utils/AuthContext';

export const EventsContext = React.createContext();

export const EventsProvider = (props) => {
  const [events, setEvents] = useState([]);
  const [eventTickets, setEventTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchEvents = () => {
      fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/events', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setEvents(data._embedded.events))
        .catch((err) => console.error(err));
    };
    fetchEvents();
  }, [auth.token]);

  return (
    <EventsContext.Provider
      value={[events, setEvents, eventTickets, setEventTickets, loading]}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
