/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classnames from 'classnames';
import { CTBtheme } from '@ctb/types';

// styles
const useStyles = makeStyles((theme: CTBtheme) => ({
  dotBase: {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    transition: theme.transitions.create('background-color'),
  },
  dotSmall: {
    width: 5,
    height: 5,
  },
  dotLarge: {
    width: 11,
    height: 11,
  },
}));

/* eslint-disable-next-line */
export interface DotProps {
  size?: string;
  color?: string;
}

export function Dot({ size, color }: DotProps) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div
      className={classnames(classes.dotBase, {
        [classes.dotLarge]: size === 'large',
        [classes.dotSmall]: size === 'small',
      })}
      style={{
        backgroundColor:
          color && theme?.palette[color] && theme?.palette[color].main,
      }}
    />
  );
}

export default Dot;
