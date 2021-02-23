import { Paper } from '@material-ui/core';
import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: pink;
`;

export function Dashboard(props: DashboardProps) {
  return (
    <Paper>
      <h1>Welcome to Dashboard!</h1>
    </Paper>
  );
}

export default Dashboard;
