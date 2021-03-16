/* eslint-disable @typescript-eslint/no-explicit-any */
import { CTBtheme } from '@ctb/types';
import { Avatar } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

/* eslint-disable-next-line */
export interface UserAvatarProps {
  children: string | React.ReactNode;
  alt?: string;
  size: 'large' | 'small';
}

const useStyles = makeStyles((theme: CTBtheme) => ({
  small: ({ size }: any) => {
    return (
      size === 'small' && {
        width: theme.spacing(8),
        height: theme.spacing(8),
      }
    );
  },
  large: ({ size }: any) => {
    return (
      size === 'large' && {
        width: theme.spacing(12),
        height: theme.spacing(12),
      }
    );
  },
  circle: {
    color: '#fff',
    backgroundColor: theme.palette.primary.light,
  },
}));

export function UserAvatar({ children, alt, size }: UserAvatarProps) {
  const classes = useStyles({ size });
  return (
    <Avatar alt={alt} className={classnames(classes.small, classes.circle)}>
      {children[0]}
    </Avatar>
  );
}

export default UserAvatar;
