import { useAuthContext } from '@ctb/auth-context';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PrivateRouteProps {}

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuthContext();
  // const [isLoggedIn, setIsloggedIn] = useState(true);
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
