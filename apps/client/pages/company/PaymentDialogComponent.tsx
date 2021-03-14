import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { TextField, Divider } from '@material-ui/core';

import { Form, PaymentBox, CardDetails } from '../../styles/paymentStyles';
import { useForm } from 'react-hook-form';
import { firestore, firebase } from '@ctb/firebase-auth';
import axios from 'axios';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import StripeInput from './StripeInput';

export interface PaymentDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  bookedInfo: any;
  company: any;
  success: boolean;
  setSuccess: (value: boolean) => void;
  tableBookings: any;
}

function PaymentDialog(props: PaymentDialogProps) {
  const { register, handleSubmit, watch, errors } = useForm({});

  const {
    onClose,
    selectedValue,
    open,
    company,
    success,
    setSuccess,
    tableBookings,
  } = props;
  const bookedInfo = props.bookedInfo;
  const stripe = useStripe();
  const elements = useElements();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const findBooking =
    tableBookings &&
    tableBookings.find((booking) => {
      return booking.companyId === company.id;
    });

  const onSubmit = async (data) => {
    const tableBookingsRef = firestore
      .collection('tableBookings')
      .doc(findBooking && findBooking.docId);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: data.name,
      },
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const url = 'http://localhost:4000/payment';
        const response = await axios.post(url, {
          amount: 100,
          id,
        });
        if (response.data.success) {
          tableBookingsRef.update({
            bookedTimes: firebase.firestore.FieldValue.arrayUnion(bookedInfo),
          });
          setSuccess(true);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {!success ? (
        <PaymentBox>
          <Typography gutterBottom={true} align="center" variant="h4">
            Payment
          </Typography>
          <label>Card details</label>
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
              name="cardNumber"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputComponent: StripeInput,
                inputProps: {
                  component: CardNumberElement,
                },
              }}
            />
            <CardDetails>
              <TextField
                id="outlined-basic"
                label="Expiry"
                variant="outlined"
                name="expiry"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardExpiryElement,
                  },
                }}
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                name="cvv"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardCvcElement,
                  },
                }}
              />
            </CardDetails>
            <TextField
              style={{ marginTop: 10 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              inputRef={register()}
              required
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
      ) : (
        <PaymentBox>
          <Typography>Payment successfull!</Typography>
        </PaymentBox>
      )}
    </Dialog>
  );
}

export default PaymentDialog;
