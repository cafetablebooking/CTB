import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Box, TextField, Button, Divider } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from '@ctb/dark-theme-provider';

import { AuthContext } from '@ctb/auth-context';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
interface Props {}

const connectCafe = (props: Props) => {
  const { companiesMockData }: any = useContext(AuthContext);
  const { register, handleSubmit, watch, errors } = useForm({});
  const onSubmit = (data) => {};
  return (
    <ThemeProvider theme={darkTheme}>
      <Wrapper>
        <Hero></Hero>
        <PaymentGuarantee>
          <TextBox>
            <Typography variant="h5">Novelty! Payment guarantee!</Typography>
            <ul>
              <li>
                <Typography>
                  100% payment guarantee for bookings from cafébooking.com
                </Typography>
              </li>
              <li>
                <Typography>
                  Up to 50% fewer cancellations • Get paid even at No-shows
                </Typography>
              </li>
              <a>Read more</a>
            </ul>
          </TextBox>
        </PaymentGuarantee>

        <OnboardingContent>
          <Typography variant="h6">CONNECT YOUR COMPANY</Typography>
          <Typography variant="h3">We will help you</Typography>
          <Box flexWrap="wrap" display="flex" flexDirection="row">
            <Box maxWidth="615px" display="flex" flexDirection="row">
              <Image src="/static/img/hero" width="30" height="30" />
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" gutterBottom={true}>
                  Fylla din kalender
                </Typography>
                <Typography variant="subtitle1" gutterBottom={true}>
                  Bokadirekt är Sveriges största site för skönhet & hälsa. Över
                  3,2 miljoner potentiella kunder söker och bokar tider här
                  varje månad.
                </Typography>
                <Typography gutterBottom={true}>
                  Dina lediga tider blir automatiskt sökbara och du får en
                  bokningsknapp på Hitta.se.
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Box maxWidth="615px" display="flex" flexDirection="row">
              <Image src="/static/img/hero" width="30" height="30" />
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" gutterBottom={true}>
                  Fylla din kalender
                </Typography>
                <Typography variant="subtitle1" gutterBottom={true}>
                  Bokadirekt är Sveriges största site för skönhet & hälsa. Över
                  3,2 miljoner potentiella kunder söker och bokar tider här
                  varje månad.
                </Typography>
                <Typography gutterBottom={true}>
                  Dina lediga tider blir automatiskt sökbara och du får en
                  bokningsknapp på Hitta.se.
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Box maxWidth="615px" display="flex" flexDirection="row">
              <Image src="/static/img/hero" width="30" height="30" />
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" gutterBottom={true}>
                  Fylla din kalender
                </Typography>
                <Typography variant="subtitle1" gutterBottom={true}>
                  Bokadirekt är Sveriges största site för skönhet & hälsa. Över
                  3,2 miljoner potentiella kunder söker och bokar tider här
                  varje månad.
                </Typography>
                <Typography gutterBottom={true}>
                  Dina lediga tider blir automatiskt sökbara och du får en
                  bokningsknapp på Hitta.se.
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Box maxWidth="615px" display="flex" flexDirection="row">
              <Image src="/static/img/hero" width="30" height="30" />
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" gutterBottom={true}>
                  Fylla din kalender
                </Typography>
                <Typography variant="subtitle1" gutterBottom={true}>
                  Bokadirekt är Sveriges största site för skönhet & hälsa. Över
                  3,2 miljoner potentiella kunder söker och bokar tider här
                  varje månad.
                </Typography>
                <Typography gutterBottom={true}>
                  Dina lediga tider blir automatiskt sökbara och du får en
                  bokningsknapp på Hitta.se.
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Box maxWidth="615px" display="flex" flexDirection="row">
              <Image src="/static/img/hero" width="30" height="30" />
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" gutterBottom={true}>
                  Fylla din kalender
                </Typography>
                <Typography variant="subtitle1" gutterBottom={true}>
                  Bokadirekt är Sveriges största site för skönhet & hälsa. Över
                  3,2 miljoner potentiella kunder söker och bokar tider här
                  varje månad.
                </Typography>
                <Typography gutterBottom={true}>
                  Dina lediga tider blir automatiskt sökbara och du får en
                  bokningsknapp på Hitta.se.
                </Typography>
              </Box>
              <Divider />
            </Box>
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 50,
            }}
          >
            <ConnectCafeBox>
              <Typography align="center" variant="h4">
                Connect Café
              </Typography>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  style={{ minWidth: '242.5px', marginTop: 20 }}
                  id="outlined-basic"
                  label="Company name"
                  variant="outlined"
                  name="cafe"
                  inputRef={register()}
                />
                <TextField
                  style={{ minWidth: '242.5px', marginTop: 10 }}
                  id="outlined-basic"
                  label="VAT Nr"
                  variant="outlined"
                  name="cafe"
                  inputRef={register()}
                />
                <TextField
                  style={{ minWidth: '242.5px', marginTop: 10 }}
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  name="cafe"
                  inputRef={register()}
                />
                <TextField
                  style={{ minWidth: '242.5px', marginTop: 10 }}
                  id="outlined-basic"
                  label="Phone number"
                  variant="outlined"
                  name="cafe"
                  inputRef={register()}
                />
                <Button
                  style={{
                    margin: '10px',
                    width: '242.5px',

                    alignSelf: 'center',
                  }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Send A Request
                </Button>
              </Form>
            </ConnectCafeBox>
          </div>
        </OnboardingContent>
      </Wrapper>
    </ThemeProvider>
  );
};
const Form = styled.form`
  display: flex;
  max-width: 400px;

  flex-direction: column;
`;
const ConnectCafeBox = styled(Box)`
  padding: 20px;
  border-radius: 4px;
  background: black;
  color: white;
  display: flex;

  flex-direction: column;
  min-width: 300px;
`;
const TextBox = styled(Box)`
  ul {
    padding-left: 15px;
    margin: 0;
  }
`;
const PaymentGuarantee = styled(Box)`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #a13e3e;
  height: 202px;
  width: 100%;
`;
const Hero = styled(Box)`
  color: white;
  display: flex;
  flex-direction: column;

  align-items: center;

  flex-wrap: wrap;
  justify-content: space-evenly;
  background: url('/static/img/hero/connect-business-hero.png') no-repeat center;
  background-size: cover;
  max-width: 100vw;
  min-height: 300px;
  @media (min-width: 768px) {
    min-height: 44vw;
  }

  @media (min-width: 970px) {
    flex-direction: row;
    justify-content: space-evenly;
  }

  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
`;

const OnboardingContent = styled(Box)`
  /* flex-wrap: wrap; */
  display: flex;

  flex-direction: column;
  min-height: 60vh;
  margin: 5vw 5vw 5vw 5vw;
  @media (min-width: 930px) {
    margin: 5vw 8vw 5vw 8vw;
  }
`;

export default connectCafe;
