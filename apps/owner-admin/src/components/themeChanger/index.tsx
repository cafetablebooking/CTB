/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useContext, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import { AppContextPropsType } from '@ctb/types';
import { ThemeMode } from '@ctb/types';

import AppContext from '../../context/appContext';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import useStyles from './index.style';
import { Typography } from '@material-ui/core';
import CustomColorCell from './customColorCell';

import themeColorSets from '../../constants/ColorSets';

interface ThemeSettingProps {}

const ThemeSetting: React.FC<ThemeSettingProps> = () => {
  // const [open, setCustomizerStatus] = useState(false);
  // const [themeColor, setThemeColor] = useState('preset');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    themeMode,
    updateThemeMode,
    updateTheme,
    theme,
  } = useContext<AppContextPropsType>(AppContext);

  const onModeChange = (
    event: React.MouseEvent<HTMLElement>,
    themeMode: ThemeMode
  ) => {
    if (themeMode) updateThemeMode(themeMode);
  };

  // const onSelectThemeColor = (
  //   event: React.MouseEvent<HTMLElement>,
  //   color: any
  // ) => {
  //   if (color) setThemeColor(color);
  // };

  const updateThemeColors = (colorSet: any) => {
    theme.palette.primary.main = colorSet.PrimaryColor;
    theme.palette.secondary.main = colorSet.SecondaryColor;
    theme.palette.sidebar.bgColor = colorSet.SidebarColor;
    updateTheme(theme);
  };
  const classes = useStyles();

  return (
    <Box className={classnames(classes.customizerOption, 'customizerOption')}>
      <Box className={classes.customizerButton}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <SettingsIcon
            className={classnames(classes.textWhite)}
            fontSize="inherit"
          />
        </IconButton>
      </Box>
      <Popover
        id="simple-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box className={classes.customizerItem}>
          <Box component="h4" mb={{ xs: 2, xl: 3 }}>
            Theme Mode
          </Box>
          <ToggleButtonGroup
            value={themeMode}
            exclusive
            onChange={onModeChange}
            aria-label="text alignment"
          >
            <ToggleButton
              value={ThemeMode.LIGHT}
              className={classnames(classes.toggleBtn, {
                active: themeMode === ThemeMode.LIGHT,
              })}
              aria-label="left aligned"
            >
              Light Mode
            </ToggleButton>
            <ToggleButton
              value={ThemeMode.DARK}
              className={classnames(classes.toggleBtn, {
                active: themeMode === ThemeMode.DARK,
              })}
              aria-label="right aligned"
            >
              Dark Mode
            </ToggleButton>
          </ToggleButtonGroup>
          <Box mt={4}>
            <Box component="ul" className={classes.colorOptionList}>
              {themeColorSets.map((colorSet, index) => (
                <CustomColorCell
                  key={index}
                  updateThemeColors={updateThemeColors}
                  themeColorSet={colorSet}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default ThemeSetting;
