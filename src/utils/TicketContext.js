import React, { useState } from 'react';

export const TicketContext = React.createContext();

export const TicketProvider = (props) => {
  const [ticket, setTicket] = useState([]);
  return (
    <TicketContext.Provider value={[ticket, setTicket]}>
      {props.children}
    </TicketContext.Provider>
  );
};
