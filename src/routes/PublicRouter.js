import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';

const PublicRouter = () => {
  return (
    <div>
      <Route exact path="/auth/login" component={Login} />
      <Redirect from="/" to="/auth/login" exact />
    </div>
  );
};

export default PublicRouter;
