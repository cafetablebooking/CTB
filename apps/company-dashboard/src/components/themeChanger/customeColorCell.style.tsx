import { makeStyles } from '@material-ui/core';
import { CTBtheme } from '@ctb/types';

const useStyles = makeStyles((theme: CTBtheme) => ({
  colorOption: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.text.primary}`,
  },
  colorOptionDivider: {
    transform: 'rotate(180deg)',
    marginTop: 14,
  },

  colorOptionRightIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 15,
    height: 15,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
  },
  textBase: {
    fontSize: 12,
  },
}));
export default useStyles;
