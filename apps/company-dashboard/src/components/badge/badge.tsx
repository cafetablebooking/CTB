/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from '@material-ui/core/styles';
import { Badge as BadgeBase, BadgeProps } from '@material-ui/core';
import React from 'react';
import { CTBtheme } from '@ctb/types';

/* eslint-disable-next-line */
export interface BadgePropsType extends BadgeProps {
  children: React.ReactNode | string;
  colorBrightness?: string;
  colorPrimary?: string;
  component?: React.ElementType;
  bColor: string;
  clr: string;
}

const useStyles = makeStyles((theme: CTBtheme) => ({
  badge: ({ bColor, clr }: any) => {
    return {
      fontWeight: 400,
      height: 20,
      minWidth: 20,
      backgroundColor: bColor,
      color: clr,
    };
  },
}));

export function Badge({ children, badgeContent, bColor, clr }: BadgePropsType) {
  const classes = useStyles({ bColor, clr });

  return (
    <BadgeBase badgeContent={badgeContent} classes={{ badge: classes.badge }}>
      {children}
    </BadgeBase>
  );
}

export default Badge;
