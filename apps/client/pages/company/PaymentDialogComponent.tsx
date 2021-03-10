import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Box, Button } from '@material-ui/core';
import { TextField, Divider, ThemeProvider } from '@material-ui/core';
import styled from 'styled-components';
import darkTheme from '../../components/ThemeProviders/DarkThemeProvider';
import { useRouter } from 'next/router';
import { Form, PaymentBox, CardDetails } from '../../styles/paymentStyles';
import { useForm } from 'react-hook-form';
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  handlePaymentDialogue: (value: string) => void;
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
  const { register, handleSubmit, watch, errors } = useForm({});
  const onSubmit = (data) => {};
  const router = useRouter();
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const bookedInfo = props.bookedInfo;

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
    <ThemeProvider theme={darkTheme}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <PaymentBox>
          <Typography gutterBottom={true} align="center" variant="h4">
            Payment
          </Typography>

          <Divider
            style={{ width: '80%', margin: '24px 0 24px 0' }}
            light={false}
            flexItem={false}
            orientation="horizontal"
          />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Card number"
              variant="outlined"
              name="cafe"
              inputRef={register()}
            />
            <CardDetails>
              <TextField
                id="outlined-basic"
                label="Expiry"
                variant="outlined"
                name="expiry"
                inputRef={register()}
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                name="cvv"
                inputRef={register()}
              />
            </CardDetails>
            <TextField
              style={{ marginTop: 10 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              inputRef={register()}
            />

            <Button
              style={{
                marginTop: 24,
                width: '242.5px',
                height: '56px',
                alignSelf: 'center',
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Confirm payment
            </Button>
          </Form>
        </PaymentBox>
      </Dialog>
    </ThemeProvider>
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
