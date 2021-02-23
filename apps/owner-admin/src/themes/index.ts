import defaultTheme from './default';

import { createMuiTheme } from '@material-ui/core';

const overrides = {
  typography: {
    h1: {
      fontSize: 22,
    },
    h2: {
      fontSize: 20,
    },
    h3: {
      fontSize: 18,
    },
    h4: {
      fontSize: 16,
    },
    h5: {
      fontSize: 14,
    },
    h6: {
      fontSize: 14,
    },
    subtitle1: {
      fontSize: 14,
    },
    subtitle2: {
      fontSize: 16,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 12,
    },
  },
};

const themes = {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
  // default: createMuiTheme({ ...defaultTheme, ...overrides }),
};

export default themes;
// export default defaultTheme;
