/* eslint-disable @typescript-eslint/no-explicit-any */

import { PaletteType, Theme, Transitions } from '@material-ui/core';
import { Direction } from '@material-ui/core/styles/createMuiTheme';
import { ZIndex } from '@material-ui/core/styles/zIndex';
import { Spacing } from '@material-ui/core/styles/createSpacing';
import { Mixins } from '@material-ui/core/styles/createMixins';
import { Shape } from '@material-ui/core/styles/shape';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
import { ComponentsProps } from '@material-ui/core/styles/props';
import { Shadows } from '@material-ui/core/styles/shadows';
import { Palette } from '@material-ui/core/styles/createPalette';

export interface AuthUser {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  role: string[];
}

interface CTBpalette extends Palette {
  type: PaletteType;
  background: {
    paper: string;
    default: string;
    light?: string;
  };
  primary: {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  };
  sidebar?: {
    bgColor: string;
    textColor: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  common: {
    white: string;
    black: string;
  };
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
  };
}

export interface CTBtheme extends Theme {
  direction: Direction;
  palette: CTBpalette;
  status: {
    danger: string;
  };
  divider: string;
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: number;
      };
      h2: {
        fontSize: number;
      };
      h3: {
        fontSize: number;
      };
      h4: {
        fontSize: number;
      };
      h5: {
        fontSize: number;
      };
      h6: {
        fontSize: number;
      };
      subtitle1: {
        fontSize: number;
      };
      subtitle2: {
        fontSize: number;
      };
      body1: {
        fontSize: number;
      };
      body2: {
        fontSize: number;
      };
    };
    MuiToggleButton: {
      root: {
        borderRadius: number;
      };
    };
    MuiCardLg: {
      root: {
        borderRadius: number;
      };
    };
    MuiCard: {
      root: {
        borderRadius: number;
      };
    };
    MuiButton: {
      root: {
        borderRadius: number;
      };
    };
  };
  spacing: Spacing;
  shape: Shape;
  breakpoints: Breakpoints;
  mixins: Mixins;
  props?: ComponentsProps;
  shadows: Shadows;
  transitions: Transitions;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface AppContextPropsType {
  user: AuthUser | null;
  theme: CTBtheme;
  themeMode: ThemeMode;
  locale: {
    languageId: string;
    locale: string;
    name: string;
    icon: string;
  };
  primary?: string;
  secondary?: string;
  sidebarColor?: string;
  updateSidebarColor?: (sidebarColor: string) => void;
  updateThemeMode?: (themeMode: ThemeMode) => void;
  updatePrimaryColor?: (primaryColor: string) => void;
  updateSecondaryColor?: (secondaryColor: string) => void;
  updateTheme?: (theme: any) => void;
}
