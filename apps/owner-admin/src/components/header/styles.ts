import { CTBtheme } from '@ctb/types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

export default makeStyles((theme: CTBtheme) => ({
  logotype: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  appBar: {
    width: '100vw',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: 25,
    paddingLeft: theme.spacing(2.5),
    width: 36,
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(['background-color', 'width']),
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
  },
  searchFocused: {
    backgroundColor: fade(theme.palette.common.black, 0.08),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
  searchIcon: {
    width: 36,
    right: 0,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create('right'),
    zIndex: 2,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  searchIconOpened: {
    right: theme.spacing(1.25),
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing(1.25),
    width: '100%',
    cursor: 'pointer',
  },
  messageContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  // headerMenu: {
  //   marginTop: theme.spacing(7),
  // },

  headerMenuItem: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.light,
      // color: "white",
    },
  },

  headerMenuButtonSandwich: {
    marginLeft: 9,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    padding: theme.spacing(0.5),
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing(2),
  },

  headerIconCollapse: {
    // color: 'white',
    color: theme.palette.text.secondary,
  },

  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  purchaseBtn: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    marginRight: theme.spacing(3),
  },
}));
