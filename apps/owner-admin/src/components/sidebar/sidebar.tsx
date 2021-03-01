/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List } from '@material-ui/core';
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  // EventSeatOutlinedIcon,
  AppsOutlined,
} from '@material-ui/icons';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import { useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// components
import SidebarLink from './components/sidebar-link/sidebar-link';
import Dot from './components/dot/dot';

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
  { id: 0, label: 'Dashboard', link: '/dashboard', icon: <AppsOutlined /> },
  {
    id: 1,
    label: 'Reservations',
    link: '/reservation',
    icon: <EventSeatOutlinedIcon />,
  },
  {
    id: 2,
    label: 'Users',
    link: '/users',
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    id: 3,
    label: 'Company/Users',
    link: '/companies',
    icon: <BusinessOutlinedIcon />,
  },
  {
    id: 4,
    label: 'Settings',
    link: '/settings',
    icon: <SettingsOutlinedIcon />,
  },
  { id: 5, type: 'divider' },
  { id: 6, type: 'title', label: 'HELP' },
  {
    id: 7,
    label: 'Support',
    link: '/support',
    icon: <QuestionAnswerOutlinedIcon />,
  },
  { id: 8, label: 'FAQ', link: '/faq', icon: <FAQIcon /> },
  { id: 9, type: 'divider' },
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
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon />
        </IconButton>
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
