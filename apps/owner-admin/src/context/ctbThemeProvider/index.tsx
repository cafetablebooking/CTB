import { AppContextPropsType } from '@ctb/types';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import appContext from '../appContext';

const CTBThemeProvider: React.FC<React.ReactNode> = (props) => {
  const { theme } = useContext<AppContextPropsType>(appContext);

  return (
    <ThemeProvider theme={responsiveFontSizes(createMuiTheme(theme))}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {props.children}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default React.memo(CTBThemeProvider);
