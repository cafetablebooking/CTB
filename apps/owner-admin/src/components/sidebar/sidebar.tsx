/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Drawer, IconButton, List, Typography } from '@material-ui/core';
import {
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  AppsOutlined,
} from '@material-ui/icons';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// components
import SidebarLink from './components/sidebar-link/sidebar-link';

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/layoutContext';
/* eslint-disable-next-line */
export interface SidebarProps {
  location?: any;
}

const structure = [
  {
    id: uuidv4(),
    label: 'Dashboard',
    link: '/dashboard',
    icon: <AppsOutlined />,
  },
  {
    id: uuidv4(),
    label: 'Reservations',
    link: '/reservation',
    icon: <EventSeatOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: 'Users',
    link: '/users',
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: 'Company/Users',
    link: '/companies',
    icon: <BusinessOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: 'Create compnay user',
    link: '/create-company-user',
    icon: <AddCircleOutlineOutlinedIcon />,
  },
  {
    id: uuidv4(),
    label: 'Settings',
    link: '/settings',
    icon: <SettingsOutlinedIcon />,
  },
  { id: uuidv4(), type: 'divider' },
  { id: uuidv4(), type: 'title', label: 'HELP' },
  {
    id: uuidv4(),
    label: 'Support',
    link: '/support',
    icon: <QuestionAnswerOutlinedIcon />,
  },
  { id: uuidv4(), label: 'FAQ', link: '/faq', icon: <FAQIcon /> },
  { id: uuidv4(), type: 'divider' },
];

export function Sidebar({ location }: SidebarProps) {
  const classes = useStyles();
  const theme: any = useTheme();

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme?.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
      ModalProps={{ onBackdropClick: () => toggleSidebar(layoutDispatch) }}
      PaperProps={{
        onClick: () => !isPermanent && toggleSidebar(layoutDispatch),
        elevation: 4,
      }}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        {!isPermanent && (
          <IconButton>
            <ArrowBackIcon />
            <Typography style={{ marginLeft: '6px' }} variant="h5">
              CTB Admin
            </Typography>
          </IconButton>
        )}
      </div>
      <List>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );
}

export default withRouter(Sidebar);
