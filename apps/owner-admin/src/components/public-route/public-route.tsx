import { useAuthContext } from '@ctb/auth-context';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PublicRouteProps {}

function PublicRoute({ component: Component, ...rest }) {
  const { uidValue } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        uidValue ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;
