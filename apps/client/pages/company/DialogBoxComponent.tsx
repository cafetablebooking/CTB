import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Box, Button, DialogActions } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  bookedInfo: any;
  company: any;
}
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const bookedInfo = props.bookedInfo;
  const startTime =
    bookedInfo.start && bookedInfo.start.replace('T', ' ').slice(0, -3);
  const endTime =
    bookedInfo.end && bookedInfo.end.replace('T', ' ').slice(0, -3);

  const findTable = props.company.tables.find(
    (table) => table.resourceId === bookedInfo.resourceId
  );

  console.log(findTable.resourceTitle);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <StyledDialogBox>
        <DialogTitle id="simple-dialog-title">
          Do you really want to book <b>{findTable.resourceTitle}</b>?
        </DialogTitle>

        <Typography>
          From: <b>{startTime}</b>
        </Typography>
        <Typography>
          To: <b>{endTime}</b>
        </Typography>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </StyledDialogBox>
    </Dialog>
  );
}

const StyledDialogBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  .MuiDialogTitle-root {
    margin-bottom: 20px;
    padding: 0 !important;
  }
`;
export default SimpleDialog;
