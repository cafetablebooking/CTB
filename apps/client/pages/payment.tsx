import React from 'react';
import PaymentRoute from '../components/PrivateRoutes/PaymentRoute';
import {
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  ThemeProvider,
} from '@material-ui/core';
import darkTheme from '../components/ThemeProviders/DarkThemeProvider';
interface Props {}
import {
  Wrapper,
  Form,
  ConnectBusinessBox,
  CardDetails,
} from '../styles/paymentStyles';
import { useForm } from 'react-hook-form';
const payment = (props: Props) => {
  const { register, handleSubmit, watch, errors } = useForm({});
  const onSubmit = (data) => {};
  return (
    <ThemeProvider theme={darkTheme}>
      <Wrapper>
        <ConnectBusinessBox>
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
        </ConnectBusinessBox>
      </Wrapper>
    </ThemeProvider>
  );
};

export default PaymentRoute(payment);
