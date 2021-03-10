/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IconButton } from '@material-ui/core';

import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';

import Badge from '../../../badge/badge';
import useStyles from './styles';

/* eslint-disable-next-line */
export interface HeaderIconButtonProps {
  onClick?: any;
  unRead?: boolean;
  themeMode?: any;
  ThemeMode?: any;
  list?: any;
  theme?: any;
  isMail?: boolean;
  isNotification?: boolean;
  isAccount?: boolean;
  badge?: boolean;
}

export function HeaderIconButton({
  onClick,
  unRead,
  list,
  themeMode,
  ThemeMode,
  theme,
  isMail,
  isNotification,
  isAccount,
  badge,
}: HeaderIconButtonProps) {
  const classes = useStyles();

  return (
    <IconButton
      color="inherit"
      aria-haspopup="true"
      aria-controls="mail-menu"
      onClick={onClick}
      className={classes.headerMenuButton}
    >
      {badge && (
        <Badge
          badgeContent={unRead ? list.length : null}
          clr={
            themeMode === ThemeMode.DARK
              ? theme.palette.primary.dark + '90'
              : theme.palette.secondary.dark + '90'
          }
          bColor={
            themeMode === ThemeMode.DARK
              ? theme.palette.secondary.light
              : theme.palette.primary.light
          }
        >
          {isNotification && (
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          )}
          {isMail && <MailIcon classes={{ root: classes.headerIcon }} />}
        </Badge>
      )}
      {isAccount && <AccountIcon classes={{ root: classes.headerIcon }} />}
    </IconButton>
  );
}

export default HeaderIconButton;
