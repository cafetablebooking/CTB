import React, { useContext } from 'react';

import { useRouter } from 'next/router';
import PrivateRoute from '../components/PrivateRoute';
import { Button, Box } from '@material-ui/core';
import styled from 'styled-components';
import { useAuthContext } from '@ctb/auth-context';
interface Props {}
const Dashboard = styled(Box)`
  min-height: 100vh;
`;

const dashboard = (props: Props) => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const logoutUser = () => {
    router.push('/signIn');
    logout();
  };

  return <Dashboard>{<Button onClick={logoutUser}>Logout</Button>}</Dashboard>;
};
export default PrivateRoute(dashboard);
