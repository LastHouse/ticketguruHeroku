import React from 'react';
import Home from '../pages/Home';
import Events from '../pages/Events';
import EventsTable from '../pages/EventsTable';
import Tickets from '../pages/Tickets';
import TicketReader from '../pages/TicketReader';
import Shop from '../pages/Shop';
import PrivateRoute from './PrivateRoute';
import { Redirect } from 'react-router-dom';
import SellTickets from '../pages/SellTickets';

const PrivateRouter = () => {
  return (
    <div>
      <PrivateRoute path="/app/home" component={Home} />
      <PrivateRoute path="/app/events" component={Events} />
      <PrivateRoute path="/app/eventstable" component={EventsTable} />
      <PrivateRoute path="/app/tickets" component={Tickets} />
      <PrivateRoute path="/app/ticketreader" component={TicketReader} />
      <PrivateRoute path="/app/shop" component={Shop} />
      <PrivateRoute path="/app/selltickets" component={SellTickets} />
      <Redirect from="/app" to="/app/home" exact />
    </div>
  );
};

export default PrivateRouter;
