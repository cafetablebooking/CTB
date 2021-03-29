import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Box, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useFirestore } from '@ctb/use-firestore';
export interface ConfirmDialogProps {
  handleClose: () => void;
  open: boolean;
  setActivateCompanies: () => void;
  selectedCompanies: any;
}

function ActivateDialogBox(props: ConfirmDialogProps) {
  const { handleClose, open, setActivateCompanies, selectedCompanies } = props;
  const { docs } = useFirestore('company_requests');
  const company =
    selectedCompanies &&
    selectedCompanies.data.map((item) => {
      const pendingCompany = docs[item.index];
      const { companyName } = pendingCompany;

      return <p>{companyName}</p>;
    });
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <StyledDialogBox>
        <DialogTitle align="center" id="simple-dialog-title">
          Confirm table
        </DialogTitle>
        <DialogContentText id="alert-dialog-slide-description">
          Do you really want to activate the following companies?
          <b>{company}</b>
        </DialogContentText>

        <StyledDialogActions>
          <Button onClick={setActivateCompanies} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </StyledDialogActions>
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
export default ActivateDialogBox;
