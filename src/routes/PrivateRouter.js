import React from 'react';
import Home from '../pages/Home';
import Events from '../pages/Events';
import Tickets from '../pages/Tickets';
import TicketReader from '../pages/TicketReader';
import PrivateRoute from './PrivateRoute';
import { Redirect } from 'react-router-dom';

const PrivateRouter = () => {
  return (
    <div>
      <PrivateRoute path="/app/home" component={Home} />
      <PrivateRoute path="/app/events" component={Events} />
      <PrivateRoute path="/app/tickets" component={Tickets} />
      <PrivateRoute path="/app/ticketreader" component={TicketReader} />
      <Redirect from="/app" to="/app/home" exact />
    </div>
  );
};

export default PrivateRouter;
