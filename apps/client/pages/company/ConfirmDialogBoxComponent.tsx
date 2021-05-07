import React from 'react';

import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Box, Button } from '@material-ui/core';
import styled from 'styled-components';
import { currentDateRoundTo } from '../../components/utils';

export interface ConfirmDialogProps {
  openConfirmBox: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handlePaymentDialog: () => void;
  bookedInfo: any;
  tableBookings: any;
  companyId: string;
}

function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    onClose,
    selectedValue,
    openConfirmBox,
    handlePaymentDialog,
    tableBookings,
    companyId,
    bookedInfo,
  } = props;

  const startTime =
    bookedInfo && bookedInfo.start.replace('T', ' ').slice(0, -3);
  const endTime = bookedInfo && bookedInfo.end.replace('T', ' ').slice(0, -3);

  const tableBooking =
    tableBookings &&
    tableBookings.find((item) => {
      return item.companyId === companyId;
    });
  const findTableResource =
    tableBooking &&
    tableBooking.resources.find((item) => {
      return item.resourceId === bookedInfo.resourceId;
    });
  const handleClose = () => {
    onClose(selectedValue);
  };
  const selectedStartTime = moment(
    bookedInfo && bookedInfo.start,
    'YYYY-MM-DD HH:mm:ss'
  ).toDate();
  //e
  const timeHasPassed = selectedStartTime < currentDateRoundTo;

  const isAlreadyBooked =
    tableBooking &&
    tableBooking.bookedTimes.filter((item) => {
      const selectedResourceId = bookedInfo.resourceId;
      const eventResourceId = item.resourceId;
      const selectedStart = moment(bookedInfo.start);
      const selectedEnd = moment(bookedInfo.end);
      const eventStart = moment(item.start);
      const eventEnd = moment(item.end);

      if (eventResourceId === selectedResourceId) {
        if (
          eventStart.isBetween(selectedStart._i, selectedEnd._i) ||
          eventEnd.isBetween(selectedStart._i, selectedEnd._i) ||
          eventStart.isSame(selectedStart._i) ||
          eventEnd.isSame(selectedEnd._i) ||
          selectedStart.isBetween(eventStart._i, eventEnd._i)
        ) {
          return item;
        }
      }
    });

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openConfirmBox ? openConfirmBox : false}
    >
      <StyledDialogBox>
        {isAlreadyBooked && isAlreadyBooked.length ? (
          <Typography>This time is already booked.</Typography>
        ) : (
          <div>
            {!timeHasPassed ? (
              <>
                <DialogTitle align="center" id="simple-dialog-title">
                  Confirm table
                </DialogTitle>
                <DialogContentText id="alert-dialog-slide-description">
                  Do you really want to book{' '}
                  <b>{findTableResource && findTableResource.resourceTitle}</b>?
                </DialogContentText>
                <Typography>
                  From: <b>{startTime}</b>
                </Typography>
                <Typography>
                  To: <b>{endTime}</b>
                </Typography>
                <StyledDialogActions>
                  <Button onClick={handlePaymentDialog} color="primary">
                    Yes
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    No
                  </Button>
                </StyledDialogActions>{' '}
              </>
            ) : (
              <Typography>You can't select a time in the passed.</Typography>
            )}{' '}
          </div>
        )}
      </StyledDialogBox>
    </Dialog>
  );
}
const StyledDialogActions = styled(DialogActions)`
  display: flex;
  justify-content: center !important;
`;
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
export default ConfirmDialog;
