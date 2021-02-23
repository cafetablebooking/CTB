import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Button,
  useTheme,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';
import { AppBarProps } from '@material-ui/core';
import classNames from 'classnames';
import { ThemeMode } from '@ctb/types';
// styles
import useStyles from './styles';

import Badge from '../badge';
import Typography from '../typography';
import Notification from '../Notification/Notification';
// import UserAvatar from '../UserAvatar/UserAvatar';
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/layoutContext';
import { AppContextPropsType } from '@ctb/types';
import appContext from '../../context/appContext';

const messages = [
  {
    id: 0,
    constiant: 'warning',
    name: 'Ramy',
    message: 'Hey! How is it going?',
    time: '9:32',
  },
  {
    id: 1,
    constiant: 'success',
    name: 'Gabriel',
    message: 'Check out my new Dashboard',
    time: '9:18',
  },
  {
    id: 2,
    constiant: 'primary',
    name: 'Amin-morocco',
    message: 'I know him',
    time: '9:15',
  },
  {
    id: 3,
    constiant: 'secondary',
    name: 'Berg',
    message: 'Jag nådde inte',
    time: '9:09',
  },
];

const notifications = [
  { id: 0, color: 'warning', message: 'Check out this awesome ticket' },
  {
    id: 1,
    color: 'success',
    type: 'info',
    message: 'What is the best way to get ...',
  },
  {
    id: 2,
    color: 'secondary',
    type: 'notification',
    message: 'This is just a simple notification',
  },
  {
    id: 3,
    color: 'primary',
    type: 'e-commerce',
    message: '12 new orders has arrived today',
  },
];

// import { useUserDispatch, signOut } from '../../context/UserContext';
/* eslint-disable-next-line */
export interface HeaderProps extends AppBarProps {
  history?: string;
}

export function Header({ history }: HeaderProps) {
  const classes = useStyles();
  const theme = useTheme();
  // console.log(theme.palette.type);
  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  // const userDispatch = useUserDispatch();

  // local
  const [mailMenu, setMailMenu] = useState(null);
  const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [notificationsMenu, setNotificationsMenu] = useState(null);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { themeMode } = useContext<AppContextPropsType>(appContext);
  return (
    <AppBar
      color={themeMode === ThemeMode.DARK ? 'primary' : 'secondary'}
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          CTB Admin
        </Typography>
        <div className={classes.grow} />

        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            clr="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>

        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            clr="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              New Messages
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              {messages.length} New Messages
            </Typography>
          </div>
          {messages.map((message) => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                {/* <UserAvatar color={message.constiant} name={message.name} /> */}
                <Typography size="sm" clr="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography clr="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}

          <Fab
            // constiant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Send New Message
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              {/* <Notification {...notification} typographyconstiant="inherit" /> */}
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              Ramy Niranjan
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              clr="primary"
            >
              Admin/Owner-Developer
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              // onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
