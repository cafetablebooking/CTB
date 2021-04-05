import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Button, Box } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import styled from 'styled-components';
interface Props {
  handleClose: () => void;
  submitFunction: () => void;
  company: HTMLElement;
  title: string;
  text: string;
}

const AlertDialogForm = (props: Props) => {
  const { handleClose, submitFunction, company, text, title } = props;

  return (
    <StyledDialogBox>
      <DialogTitle align="center" id="simple-dialog-title">
        {title}
      </DialogTitle>
      <DialogContentText id="alert-dialog-slide-description">
        {text}
        {company && <b>{company}</b>}
      </DialogContentText>

      <StyledDialogActions>
        <Button onClick={submitFunction} color="primary">
          Yes
        </Button>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
      </StyledDialogActions>
    </StyledDialogBox>
  );
};
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

export default AlertDialogForm;
