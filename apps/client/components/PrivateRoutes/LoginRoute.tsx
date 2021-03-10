import { AuthContext, useAuthContext } from '@ctb/auth-context';
import { useClientContext } from 'apps/client/contexts/ClientContext';

import React, { useContext } from 'react';
import Dashboard from '../../pages/dashboard';
import Payment from '../../pages/payment';
const LoginRoute = (Component) => {
  const Auth = (props) => {
    const { user }: any = useAuthContext();
    const { bookedInfo }: any = useClientContext();
    let route;
    if (user) {
      bookedInfo ? (route = <Payment />) : (route = <Dashboard />);
      return route;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default LoginRoute;
