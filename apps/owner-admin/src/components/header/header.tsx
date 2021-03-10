/* eslint-disable no-empty-pattern */
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
  Typography,
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
import { CTBtheme, ThemeMode } from '@ctb/types';
// styles
import useStyles from './styles';

import Badge from '../badge';
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/layoutContext';
import { AppContextPropsType } from '@ctb/types';
import appContext from '../../context/appContext';
import { useAuthContext } from '@ctb/auth-context';
import { useFirestore } from '@ctb/use-firestore';
import HeaderDropDownMenu from './components/header-drop-down-menu/header-drop-down-menu';
import HeaderIconButton from './components/header-icon-button/header-icon-button';

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

// import { useUserDispatch, signOut } from '../../context/UserContext';
/* eslint-disable-next-line */
export interface HeaderProps extends AppBarProps {}

export function Header({}: HeaderProps) {
  const classes = useStyles();
  const theme = useTheme<CTBtheme>();
  const { docs } = useFirestore('company_request');
  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const { logout } = useAuthContext();
  // local
  const [mailMenu, setMailMenu] = useState(null);
  const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [notificationsMenu, setNotificationsMenu] = useState(null);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { themeMode } = useContext<AppContextPropsType>(appContext);

  console.log(docs);
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
        <Typography variant="h6" className={classes.logotype}>
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

        <HeaderIconButton
          onClick={(e) => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          isNotification
          themeMode={themeMode}
          ThemeMode={ThemeMode}
          theme={theme}
          list={docs}
          unRead={isNotificationsUnread}
          badge
        />
        <HeaderIconButton
          onClick={(e) => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          isMail
          themeMode={themeMode}
          ThemeMode={ThemeMode}
          theme={theme}
          list={messages}
          unRead={isMailsUnread}
          badge
        />
        <HeaderIconButton
          onClick={(e) => setProfileMenu(e.currentTarget)}
          themeMode={themeMode}
          ThemeMode={ThemeMode}
          theme={theme}
          isAccount
        />

        <HeaderDropDownMenu
          list={messages}
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          isMessage
          title="Messages"
        />
        <HeaderDropDownMenu
          list={docs}
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          title="Notifications"
        />
        <HeaderDropDownMenu
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          title="Ramy Niranjan"
          isProfile
          subTitle="Owner-admin"
          logout={logout}
        />
      </Toolbar>
    </AppBar>
  );
}
export default Header;
