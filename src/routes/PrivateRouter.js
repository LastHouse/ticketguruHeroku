import React from 'react';
import EventsTable from '../pages/EventsTable';
import Tickets from '../pages/Tickets';
import SaleEventsTable from '../pages/SaleEventsTable';
import ShoppingCart from '../pages/ShoppingCart';
import PrivateRoute from './PrivateRoute';
import { Redirect } from 'react-router-dom';

const PrivateRouter = () => {
  return (
    <div>
      <PrivateRoute path="/app/eventstable" component={EventsTable} />
      <PrivateRoute path="/app/tickets" component={Tickets} />
      <PrivateRoute path="/app/saleeventstable" component={SaleEventsTable} />
      <PrivateRoute path="/app/shoppingcart" component={ShoppingCart} />
      <Redirect from="/app" to="/app/eventstable" exact />
    </div>
  );
};

export default PrivateRouter;
