import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ props }) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth' }} />
        )
      }
    />
  );
};

export default PrivateRoute;
