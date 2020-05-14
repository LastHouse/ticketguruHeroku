import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../utils/AuthContext';

export const TicketContext = React.createContext();

export const TicketProvider = (props) => {
  const { auth } = useAuthContext();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchEvents = () => {
      fetch('https://rbmk-ticketguru-backend.herokuapp.com/api/tickets', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setTickets(data._embedded.tickets))
        .catch((err) => console.error(err));
    };
    fetchEvents();
  }, [auth.token]);

  return (
    <TicketContext.Provider value={[tickets, setTickets]}>
      {props.children}
    </TicketContext.Provider>
  );
};
