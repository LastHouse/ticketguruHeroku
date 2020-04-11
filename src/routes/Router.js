import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import Unauthorized from '../pages/Unauthorized';

const Router = () => {
  return (
    <div>
      <Switch>
        <Route path="/app" component={PrivateRouter} />
        <Route path="/auth" component={PublicRouter} />
        <Route component={Unauthorized} />
      </Switch>
    </div>
  );
};

export default Router;
