import { auth, functions } from '@ctb/firebase-auth';
import { Paper } from '@material-ui/core';
import React from 'react';
// import * as admin from 'firebase-admin';

import styled from 'styled-components';
import Layout from '../../components/layout/layout';

/* eslint-disable-next-line */
export interface DashboardProps {}

const allUsers = functions.httpsCallable('listAllUsersCall');
allUsers().then((res) => {
  console.log(res);
});

export function Dashboard(props: DashboardProps) {
  return (
    <Layout>
      <h1>Welcome to customer Dashboard!</h1>
      <h1>Welcome to customer Dashboard!</h1>
      <h1>Welcome to customer Dashboard!</h1>
    </Layout>
  );
}

export default Dashboard;
