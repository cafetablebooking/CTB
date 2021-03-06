import { useAuthContext } from '@ctb/auth-context';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PublicRouteProps {}

function PublicRoute({ component: Component, ...rest }) {
  // const [isLoggedIn, setIsloggedIn] = useState(true);
  const { user } = useAuthContext();
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;
