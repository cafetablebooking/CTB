import { useAuthContext } from '@ctb/auth-context';

import React, { useContext } from 'react';
import Dashboard from '../../pages/dashboard';
import Payment from '../../pages/payment';
const LoginRoute = (Component) => {
  const Auth = (props) => {
    const { user }: any = useAuthContext();
    if (user) {
      return <Dashboard />;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default LoginRoute;
