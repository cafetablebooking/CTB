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
} from '@material-ui/icons';
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
  { id: 0, label: 'Dashboard', link: '/app/dashboard', icon: <HomeIcon /> },
  {
    id: 1,
    label: 'Reservation',
    link: '/app/typography',
    icon: <TypographyIcon />,
  },
  { id: 2, label: 'Tables', link: '/app/tables', icon: <TableIcon /> },
  {
    id: 3,
    label: 'Users',
    link: '/app/notifications',
    icon: <NotificationsIcon />,
  },
  {
    id: 4,
    label: 'Tables',
    link: '/app/ui',
    icon: <UIElementsIcon />,
    children: [
      { label: 'Icons', link: '/app/ui/icons' },
      { label: 'Charts', link: '/app/ui/charts' },
      { label: 'Maps', link: '/app/ui/maps' },
    ],
  },
  { id: 5, type: 'divider' },
  { id: 6, type: 'title', label: 'HELP' },
  { id: 7, label: 'Library', link: '', icon: <LibraryIcon /> },
  { id: 8, label: 'Support', link: '', icon: <SupportIcon /> },
  { id: 9, label: 'FAQ', link: '', icon: <FAQIcon /> },
  { id: 10, type: 'divider' },

  { id: 11, type: 'title', label: 'Upcoming' },
  {
    id: 12,
    label: 'My recent',
    link: '',
    icon: <Dot size="small" color="warning" />,
  },
  {
    id: 13,
    label: 'Starred',
    link: '',
    icon: <Dot size="small" color="primary" />,
  },
  {
    id: 14,
    label: 'Background',
    link: '',
    icon: <Dot size="small" color="secondary" />,
  },
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
          <ArrowBackIcon
          // classes={{
          //   root: classNames(classes.headerIcon, classes.headerIconCollapse),
          // }}
          />
        </IconButton>
      </div>
      {/* <List className={classes.sidebarList}> */}
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
