import { auth, functions } from '@ctb/firebase-auth';
import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import Card from '../../components/card/card';
// import * as admin from 'firebase-admin';

import Layout from '../../components/layout/layout';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  return (
    <Layout>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4}>
          <Card headerTitle="Create" headerSubTitle="company user" actionIcon />
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <Card /> */}
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <Card /> */}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Dashboard;
