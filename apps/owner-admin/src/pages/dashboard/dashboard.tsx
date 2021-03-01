import { Paper } from '@material-ui/core';
import React from 'react';

import styled from 'styled-components';
import Layout from '../../components/layout/layout';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: pink;
`;

export function Dashboard(props: DashboardProps) {
  return (
    <Layout history="ddd">
      <h1>Welcome to Dashboard!</h1>
      <h1>Welcome to Dashboard!</h1>
      <h1>Welcome to Dashboard!</h1>
    </Layout>
  );
}

export default Dashboard;
