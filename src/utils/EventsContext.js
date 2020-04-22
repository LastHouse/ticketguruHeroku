import React, { useState, useEffect, createContext } from 'react';
import { useAuthContext } from '../utils/AuthContext';

export const EventsContext = createContext();

export const EventsProvider = (props) => {
  const [events, setEvents] = useState([]);
  const [eventTickets, setEventTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthContext();

  useEffect(() => {
    (async () => {
      const [eventResult, eventTicketResult] = await Promise.all([
        fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/events', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }),
        fetch(
          'https://rbmk-ticketguru-backend.herokuapp.com/api/eventTickets',
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        ),
      ]);
      setEvents(await eventResult.json());
      setEventTickets(await eventTicketResult.json());
      setLoading(false);
    })();
  }, [auth.token]);

  return (
    <EventsContext.Provider value={{ events, eventTickets, loading }}>
      {props.children}
    </EventsContext.Provider>
  );
};
