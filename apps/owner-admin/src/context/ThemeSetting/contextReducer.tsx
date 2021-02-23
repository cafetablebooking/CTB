/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeMode } from '../../constants/AppEnums';

export const ThemeSetting = {
  UPDATE_THEME: 'UPDATE_THEME',
  UPDATE_THEME_MODE: 'UPDATE_THEME_MODE',
  UPDATE_HEADER_MODE: 'UPDATE_HEADER_MODE',
  UPDATE_PRIMARY_COLOR: 'UPDATE_PRIMARY_COLOR',
  UPDATE_SIDEBAR_COLOR: 'UPDATE_SIDEBAR_COLOR',
  UPDATE_SECONDARY_COLOR: 'UPDATE_SECONDARY_COLOR',
};

export function contextReducer(state: any, action: any) {
  switch (action.type) {
    case ThemeSetting.UPDATE_THEME: {
      return {
        ...state,
        theme: action.payload,
        primary: action.payload.palette.primary.main,
        secondary: action.payload.palette.secondary.main,
      };
    }
    case ThemeSetting.UPDATE_THEME_MODE: {
      const theme = state.theme;
      if (action.payload === ThemeMode.DARK) {
        theme.palette.type = ThemeMode.DARK;
        theme.palette.background = {
          paper: '#313541',
          default: '#393D4B',
        };
        theme.palette.text = {
          primary: 'rgba(255, 255, 255, 0.87)',
          secondary: 'rgba(255, 255, 255, 0.67)',
          disabled: 'rgba(255, 255, 255, 0.38)',
          hint: 'rgba(255, 255, 255, 0.38)',
        };
      } else {
        theme.palette.type = ThemeMode.LIGHT;
        theme.palette.background = {
          paper: '#FFFFFF',
          default: '#f3f4f6',
        };
        theme.palette.text = {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.67)',
          disabled: 'rgba(0, 0, 0, 0.38)',
          hint: 'rgba(0, 0, 0, 0.38)',
        };
      }
      return {
        ...state,
        theme,
        themeMode: action.payload,
      };
    }
    case ThemeSetting.UPDATE_HEADER_MODE: {
      return {
        ...state,
        headerMode: action.payload,
      };
    }
    case ThemeSetting.UPDATE_PRIMARY_COLOR: {
      return {
        ...state,
        primary: action.payload,
      };
    }
    case ThemeSetting.UPDATE_SIDEBAR_COLOR: {
      return {
        ...state,
        sidebarColor: action.payload,
      };
    }
    case ThemeSetting.UPDATE_SECONDARY_COLOR: {
      return {
        ...state,
        secondary: action.payload,
      };
    }
    default:
      return state;
  }
}
