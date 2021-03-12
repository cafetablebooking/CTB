import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';

import {
  Box,
  Button,
  DialogActions,
  DialogContentText,
} from '@material-ui/core';
import styled from 'styled-components';
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handlePaymentDialog: () => void;
  bookedInfo: any;
  tableBookings: any;
}

function SimpleDialog(props: SimpleDialogProps) {
  const {
    onClose,
    selectedValue,
    open,
    handlePaymentDialog,
    tableBookings,
  } = props;
  const bookedInfo = props.bookedInfo;
  const startTime =
    bookedInfo.start && bookedInfo.start.replace('T', ' ').slice(0, -3);
  const endTime =
    bookedInfo.end && bookedInfo.end.replace('T', ' ').slice(0, -3);

  const findTable = tableBookings[0].resources.find(
    (table) => table.resourceId === bookedInfo.resourceId
  );

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <StyledDialogBox>
        <DialogTitle id="simple-dialog-title">Confirm table</DialogTitle>
        <DialogContentText id="alert-dialog-slide-description">
          Do you really want to book <b>{findTable.resourceTitle}</b>?
        </DialogContentText>
        <Typography>
          From: <b>{startTime}</b>
        </Typography>
        <Typography>
          To: <b>{endTime}</b>
        </Typography>
        <DialogActions>
          <Button onClick={handlePaymentDialog} color="primary">
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
