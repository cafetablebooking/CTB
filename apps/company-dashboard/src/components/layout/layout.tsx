import React, { Children } from 'react';
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
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();
  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <Paper
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <ThemeSetting />
        <div className={classes.fakeToolbar} />
        {children}
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
