import { useAuthContext } from '@ctb/auth-context';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PrivateRouteProps {}

function PrivateRoute({ component: Component, ...rest }) {
  const { uidValue } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        uidValue ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
