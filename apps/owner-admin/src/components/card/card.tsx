import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {
  Card as CardBase,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
  IconButton,
} from '@material-ui/core/';

import { useStyles } from './styles';

/* eslint-disable-next-line */
export interface CardProps {
  headerTitle: string;
  headerSubTitle: string;
  onlyAction?: boolean;
  actionIcon?: boolean;
}

export function Card({
  headerTitle,
  headerSubTitle,
  onlyAction = true,
  actionIcon = false,
}: CardProps) {
  const classes = useStyles();
  return (
    <CardBase className={classes.root}>
      <CardHeader title={headerTitle} subheader={headerSubTitle} />
      {!onlyAction && (
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            ddddddddddd
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            ssssssss
          </Typography>
        </CardContent>
      )}
      {onlyAction && (
        <CardActions>
          {actionIcon && (
            <IconButton>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          )}
        </CardActions>
      )}
    </CardBase>
  );
}

export default Card;
