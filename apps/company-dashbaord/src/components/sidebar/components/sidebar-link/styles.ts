import { CTBtheme } from '@ctb/types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from '@material-ui/styles';

export interface SidebarLinkStyleProps {
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default makeStyles((theme: CTBtheme) => ({
  link: {
    textDecoration: 'none',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.default,
    },
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
  },
  linkNested: {
    paddingLeft: 0,
    '&:hover, &:focus': {
      backgroundColor: '#FFFFFF',
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('color'),
    width: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  linkIconActive: {
    color: theme.palette.primary.main,
  },
  linkText: {
    padding: 0,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(['opacity', 'color']),
    fontSize: 16,
  },
  linkTextActive: {
    color: theme.palette.text.primary,
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: '#D8D8D880',
  },
}));