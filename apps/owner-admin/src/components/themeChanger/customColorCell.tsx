/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import useStyles from './customeColorCell.style';
import AppContext from '../../context/appContext';
import CheckIcon from '@material-ui/icons/Check';
import { AppContextPropsType } from '@ctb/types';

interface CustomColorCellProps {
  themeColorSet: any;
  updateThemeColors: (color: any) => void;
}

const CustomColorCell: React.FC<CustomColorCellProps> = ({
  themeColorSet,
  updateThemeColors,
}) => {
  const classes = useStyles();
  const { theme } = useContext<AppContextPropsType>(AppContext);
  return (
    <Box
      component="li"
      onClick={() => {
        updateThemeColors(themeColorSet);
      }}
    >
      <Box
        height={30}
        width={30}
        style={{
          borderRadius: '100%',
          backgroundColor: themeColorSet.PrimaryColor,
        }}
        className={classes.colorOption}
      >
        <Box
          height={30}
          width={30}
          style={{
            backgroundColor: themeColorSet.SecondaryColor,
          }}
          className={classes.colorOptionDivider}
        />
        <Box />

        {theme.palette.primary.main === themeColorSet.PrimaryColor &&
        theme.palette.secondary.main === themeColorSet.SecondaryColor ? (
          <span className={classes.colorOptionRightIcon}>
            <CheckIcon className={classes.textBase} />
          </span>
        ) : null}
      </Box>
    </Box>
  );
};

export default CustomColorCell;
