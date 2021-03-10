import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Box, Button, DialogActions } from '@material-ui/core';
import styled from 'styled-components';
import { useRouter } from 'next/router';
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handlePaymentDialog: (value: string) => void;
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
  const router = useRouter();
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

  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value: string) => {
    onClose(value);
  };
  const handleRedirect = () => {
    router.push('/payment');
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
          <Button onClick={props.handlePaymentDialog} color="primary">
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
