import { useAuthContext } from '@ctb/auth-context';

import SignIn from '../pages/signIn';

const PrivateRoute = (Component) => {
  const Auth = (props) => {
    const { user }: any = useAuthContext();

    if (!user) {
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
