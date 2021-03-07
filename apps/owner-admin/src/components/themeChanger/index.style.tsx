import { makeStyles } from '@material-ui/core/styles';
import { CTBtheme } from '@ctb/types';

const useStyles = makeStyles((theme: CTBtheme) => ({
  customizerOption: {
    position: 'absolute',
    right: 0,
    top: 200,
    zIndex: 1110,
    [theme.breakpoints.up('xl')]: {
      top: 125,
    },
  },
  customizerButton: {
    borderRadius: '30px 0 0 30px',
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
    '& button': {
      borderRadius: '30px 0 0 30px',

      '&:focus': {
        borderRadius: '30px 0 0 30px',
      },
    },
  },

  customizerItem: {
    '&:not(:last-child)': {
      borderBottom: ['1px solid #e0e0e0'],
      paddingBottom: 20,
      marginBottom: 20,
      [theme.breakpoints.up('xl')]: {
        paddingBottom: 30,
        marginBottom: 30,
      },
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectBox: {
    '& .MuiOutlinedInput-input': {
      padding: '12px 32px 12px 14px',
    },
  },
  toggleBtn: {
    height: 36,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:not(:first-child)': {
      borderColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('xl')]: {
      height: 48,
      minWidth: 96,
    },
    '&:hover,&:focus': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
    },
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover,&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  },
  colorOptionList: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -5px',
    padding: 10,
    listStyle: 'none',
    '& > li': {
      padding: '0 5px',
      marginBottom: 10,
    },
    width: '300px',
    //width of the color-set
  },
  wFull: {
    width: '100%',
  },
  textWhite: {
    color: 'white',
  },
  mb5: {
    marginBottom: 20,
  },
}));
export default useStyles;
