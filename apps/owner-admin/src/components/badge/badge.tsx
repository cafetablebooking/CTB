import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Badge as BadgeBase, BadgeProps } from '@material-ui/core';
import classnames from 'classnames';
import React from 'react';

import styled from 'styled-components';
import { getColor } from '../../utility/helper';

/* eslint-disable-next-line */
export interface BadgePropsType extends BadgeProps {
  children: React.ReactNode | string;
  colorBrightness?: string;
  clr: string;
  component?: React.ElementType;
}

export function Badge({ children, colorBrightness, clr }: BadgePropsType) {
  const useStyles = makeStyles((theme) => ({
    badge: {
      fontWeight: 600,
      height: 16,
      minWidth: 16,
      // backgroundColor: getColor(clr, theme, colorBrightness),
    },
  }));
  const classes = useStyles();
  const theme = useTheme();

  return (
    <BadgeBase
      classes={{
        badge: classnames(classes.badge),
      }}
    >
      {children}
    </BadgeBase>
  );
}

export default Badge;
