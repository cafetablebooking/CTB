import { AuthContext } from '@ctb/auth-context';
import React, { useContext } from 'react';
import SignIn from '../pages/signIn';

const PrivateRoute = (Component) => {
  const Auth = (props) => {
    const { currentUser }: any = o(AuthContext);

    if (!currentUser) {
      return <SignIn />;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default PrivateRoute;
