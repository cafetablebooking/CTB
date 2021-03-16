import { CTBtheme } from '@ctb/types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme: CTBtheme) => ({
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  profileMenuUser: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    marginLeft: 15,
  },
  messageNotification: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.light,
    },
  },
  messageNotificationSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
  },
  messageNotificationBodySide: {
    alignItems: 'flex-start',
    marginRight: 0,
  },
  notificationItemContainer: {
    marginBottom: 2,
    padding: 6,
  },
  headerMenuList: {
    display: 'flex',
    flexDirection: 'column',
  },
  // profileMenuUser: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   padding: theme.spacing(2),
  //   marginLeft: 15,
  // },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  sendMessageButton: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: 'none',
  },
  sendButtonIcon: {
    marginLeft: theme.spacing(2),
  },
  profileMenu: {
    minWidth: 265,
  },
}));
