import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Box, IconButton, Link, Paper } from '@material-ui/core';

import Header from '../header/header';
import Sidebar from '../sidebar';
import { useLayoutState } from '../../context/layoutContext';
import useStyles from './styles';
import Dashboard from '../../pages/dashboard/dashboard';
import ThemeSetting from '../themeChanger';
// import { ThemeSetting } from '../../context/ThemeSetting/ContextReducer';
/* eslint-disable-next-line */
export interface LayoutProps {
  history?: string;
}

export function Layout({ history }: LayoutProps) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();
  return (
    <div className={classes.root}>
      <Header history={history} />
      <Sidebar />
      <Paper
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <ThemeSetting />
        <div className={classes.fakeToolbar} />
        {/* <Switch>
          <Route path="/app/dashboard" component={Dashboard} />
          <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
        </Switch> */}
        <Box
          mt={5}
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent="space-between"
        ></Box>
      </Paper>
    </div>
  );
}

export default Layout;
