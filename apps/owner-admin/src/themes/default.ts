/* eslint-disable @typescript-eslint/no-explicit-any */
// import { PaletteType, Theme } from '@material-ui/core';
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { green } from '@material-ui/core/colors';
import tinycolor from 'tinycolor2';
// import { useMode } from '../context/modeContext';

const primary = '#25b7b9';
// const primary = '#536DFE';
const secondary = '#FF5C93';
const warning = '#FFC260';
const success = '#3CD4A0';
const info = '#9013FE';

const lightenRate = 7.5;
const darkenRate = 100;

const defaultTheme: any = {
  palette: {
    // type: PaletteType,
    primary: {
      main: primary,
      light: tinycolor(primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(primary).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary).lighten(lightenRate).toHexString(),
      dark: tinycolor(secondary).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF',
    },
    warning: {
      main: warning,
      light: tinycolor(warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(warning).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF',
    },
    success: {
      main: success,
      light: tinycolor(success).lighten(lightenRate).toHexString(),
      dark: tinycolor(success).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF',
    },
    info: {
      main: info,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#6E6E6E',
      hint: '#B9B9B9',
    },
    // background: {
    //   default: '#F6F7FF',
    //   light: '#F3F5FF',
    //   // paper: '#000',
    // },
  },
  customShadows: {
    widget:
      '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark:
      '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide:
      '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: '#4A4A4A1A',
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
      },
    },
    MuiSelect: {
      icon: {
        color: '#B9B9B9',
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: '#F3F5FF !important',
          '&:focus': {
            backgroundColor: '#F3F5FF',
          },
        },
      },
      button: {
        '&:hover, &:focus': {
          backgroundColor: '#f77',
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white',
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(224, 224, 224, .5)',
        paddingLeft: 24,
      },
      head: {
        fontSize: '0.95rem',
      },
      body: {
        fontSize: '0.95rem',
      },
    },
    PrivateSwitchBase: {
      root: {
        marginLeft: 10,
      },
    },
  },
};

export default defaultTheme;

// import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
// import { HeaderType, ThemeMode } from '../constants/AppEnums';

// const breakpoints = createBreakpoints({});
// // const cardRadius = ThemeStyleRadius.STANDARD;
// const cardRadius = 8;
// const defaultConfig: any = {
//   theme: {
//     spacing: 4,
//     // direction: 'ltr',
//     palette: {
//       type: ThemeMode.LIGHT,
//       background: {
//         paper: '#FFFFFF',
//         default: '#F4F7FE',
//       },
//       primary: {
//         main: '#0A8FDC',
//         contrastText: '#fff',
//       },
//       secondary: {
//         main: '#F04F47',
//       },
//       sidebar: {
//         bgColor: '#313541',
//         textColor: '#808183',
//       },
//       gray: {
//         50: '#fafafa',
//         100: '#f7fafc',
//         200: '#edf2f7',
//         300: '#E0E0E0',
//         400: '#c5c6cb',
//         500: '#A8A8A8',
//         600: '#666666',
//         700: '#4a5568',
//         800: '#201e21',
//         900: '#1a202c',
//         A100: '#d5d5d5',
//         A200: '#aaaaaa',
//         A400: '#303030',
//         A700: '#616161',
//       },
//       text: {
//         primary: '#495057',
//         secondary: '#74788d',
//         disabled: '#909098',
//         hint: '#aeafb8',
//         white: '#fff',
//       },
//     },
//     status: {
//       danger: 'orange',
//     },
//     divider: 'rgba(0, 0, 0, 0.12)',
//     typography: {
//       fontFamily: ['Poppins', 'sans-serif'].join(','),
//     },
//     overrides: {
//       MuiTypography: {
//         h1: {
//           fontSize: 22,
//         },
//         h2: {
//           fontSize: 20,
//         },
//         h3: {
//           fontSize: 18,
//         },
//         h4: {
//           fontSize: 16,
//         },
//         h5: {
//           fontSize: 14,
//         },
//         h6: {
//           fontSize: 14,
//         },
//         subtitle1: {
//           fontSize: 14,
//         },
//         subtitle2: {
//           fontSize: 16,
//         },
//         body1: {
//           fontSize: 14,
//         },
//         body2: {
//           fontSize: 12,
//         },
//       },
//       MuiToggleButton: {
//         root: {
//           borderRadius: cardRadius,
//         },
//       },
//       MuiCardLg: {
//         root: {
//           borderRadius: 20,
//           // cardRadius === ThemeStyleRadius.STANDARD
//           //   ? ThemeStyleRadius.STANDARD
//           //   : ThemeStyleRadius.MODERN + 20,
//         },
//       },
//       MuiCard: {
//         root: {
//           borderRadius: cardRadius,
//           boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
//           '& .MuiCardContent-root:last-child': {
//             paddingBottom: 16,
//           },
//         },
//       },
//       MuiButton: {
//         root: {
//           borderRadius: cardRadius,
//           boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
//           [breakpoints.down('md')]: {
//             paddingTop: '8px !important',
//             paddingBottom: '8px !important',
//           },
//         },
//       },
//     },
//   },

//   themeMode: ThemeMode.LIGHT,
//   headerType: HeaderType.LIGHT,
//   locale: {
//     languageId: 'english',
//     locale: 'en',
//     name: 'English',
//     icon: 'us',
//   },
// };
// export default defaultConfig;
