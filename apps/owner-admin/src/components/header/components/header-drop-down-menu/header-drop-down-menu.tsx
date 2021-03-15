/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fab, Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react';
import classNames from 'classnames';

import UserAvatar from '../../../user-avatar/user-avatar';
import useStyles from './styles';
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';
/* eslint-disable-next-line */
export interface HeaderDropDownMenuProps {
  list?: any;
  open: boolean;
  anchorEl: any;
  onClose: any;
  isMessage?: boolean;
  isNotification?: boolean;
  isProfile?: boolean;
  title: string;
  logout?: any;
  subTitle?: string;
}

function HeaderDropDownMenu({
  list,
  open,
  anchorEl,
  onClose,
  isMessage,
  title,
  isProfile,
  logout,
  subTitle,
}: HeaderDropDownMenuProps) {
  const classes = useStyles();
  return (
    <Menu
      id="notifications-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      className={classes.headerMenu}
      MenuListProps={{ className: classes.headerMenuList }}
      classes={{ paper: classes.profileMenu }}
      disableAutoFocusItem
    >
      <div className={classes.profileMenuUser}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle2" color="secondary">
          {isProfile ? subTitle : `${list.length} New ${title}`}
        </Typography>
      </div>
      {list &&
        list.map((listItem) => (
          <MenuItem
            key={listItem.id}
            onClick={onClose}
            className={classes.messageNotification}
          >
            <div className={classes.messageNotificationSide}>
              <UserAvatar size="small">
                {listItem.name ? listItem.name : 'User'}
              </UserAvatar>
              {isMessage && <Typography>{listItem.time}</Typography>}
            </div>
            <div
              className={classNames(
                classes.messageNotificationSide,
                classes.messageNotificationBodySide,
                classes.notificationItemContainer
              )}
            >
              {isMessage && (
                <Typography variant="subtitle2">{listItem.name}</Typography>
              )}
              <Typography color="textSecondary">{listItem.message}</Typography>
            </div>
          </MenuItem>
        ))}
      {isMessage && (
        <Fab
          variant="extended"
          color="secondary"
          aria-label="Add"
          className={classes.sendMessageButton}
        >
          Send New Message
          <SendIcon className={classes.sendButtonIcon} />
        </Fab>
      )}
      {isProfile && (
        <div className={classes.profileMenuUser}>
          <Typography
            className={classes.profileMenuLink}
            color="primary"
            onClick={logout}
          >
            Sign Out
          </Typography>
        </div>
      )}
    </Menu>
  );
}

export default HeaderDropDownMenu;
