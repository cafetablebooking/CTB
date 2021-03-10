import { CTBtheme } from '@ctb/types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme: CTBtheme) => ({
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  headerIcon: {
    fontSize: 28,
    color: 'rgba(255, 255, 255, 0.35)',
    // cursor: 'pointer',
  },
}));
