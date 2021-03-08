import React, { useCallback, useReducer } from 'react';
import { CTBtheme } from '@ctb/types';

import defaultConfig from './defaultConfig';
import { contextReducer, ThemeSetting } from './ContextReducer';
// import { ThemeMode } from '../../constants/AppEnums';
import { ThemeMode } from '@ctb/types';
import AppContext from '../appContext';

export const ContextState = {
  user: null,
  theme: defaultConfig.theme,
  themeMode: defaultConfig.themeMode,
  primary: defaultConfig.theme.palette.primary.main,
  sidebarColor: defaultConfig.theme.palette.sidebar.bgColor,
  secondary: defaultConfig.theme.palette.secondary.main,
};

const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, ContextState);

  const updatePrimaryColor = (primary: string) => {
    dispatch({ type: ThemeSetting.UPDATE_PRIMARY_COLOR, payload: primary });
  };
  const updateSidebarColor = (sidebarColor: string) => {
    dispatch({
      type: ThemeSetting.UPDATE_SIDEBAR_COLOR,
      payload: sidebarColor,
    });
  };
  const updateSecondaryColor = (secondary: string) => {
    dispatch({ type: ThemeSetting.UPDATE_SECONDARY_COLOR, payload: secondary });
  };
  const updateThemeMode = useCallback((themeMode: ThemeMode) => {
    dispatch({ type: ThemeSetting.UPDATE_THEME_MODE, payload: themeMode });
  }, []);
  const updateTheme = (theme: CTBtheme) => {
    dispatch({ type: ThemeSetting.UPDATE_THEME, payload: theme });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        updateSidebarColor,
        updateTheme,
        updateThemeMode,
        updatePrimaryColor,
        updateSecondaryColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
