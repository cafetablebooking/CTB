import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Box, TextField, Button, Divider } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from '@ctb/dark-theme-provider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AuthContext } from '@ctb/auth-context';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
interface Props {}

const connectCafe = (props: Props) => {
  const { companiesMockData }: any = useContext(AuthContext);
  const { register, handleSubmit, watch, errors } = useForm({});

  const connectInfoData = [
    {
      title: 'Fill your tables',
      image: '/static/business-icons/tables.svg',
      subtitle1:
        'CTB (Cafe Table Booking) is a universal table booking service where your customers can book their visit in advance.',
      subtitle2:
        'Your free tables are automatically displayed and you will get a booking page on CTB.',
    },
    {
      title: 'Being Available (Covid-19)',
      image: '/static/business-icons/Vector.svg',
      subtitle1:
        'New rules and regulations requires foresight. We want to make sure there is room for everyone, so people can calmly enjoy their visit.',
      subtitle2:
        'Our service facilitates management and adjustment for both customers and businesses.',
    },
    {
      title: 'Manage table bookings',
      image: '/static/business-icons/bookings.svg',
      subtitle1:
        'We will help you to organize your business in forms of offering a service to maintain a clear schedule of your bookings.',
      subtitle2:
        'You will have an admin dashboard where you can manage your tables and see further details of your bookings.',
    },
    {
      title: 'Increase your sales',
      image: '/static/business-icons/money.svg',
      subtitle1:
        'We will fill your calendar in advance so your staff also can plan in advance, this will improve structure. As well as increasing your sales.',
      subtitle2: '',
    },
  ];

  const renderConnectInfoData = () => {
    const infoData = connectInfoData.map((item) => {
      const image: string = item.image;
      const title: string = item.title;
      const subtitle1: string = item.subtitle1;
      const subtitle2: string = item.subtitle2;

      return (
        <BusinessInfoItem key={title}>
          <BusinessInnerBox>
            <div style={{ position: 'relative', width: 50, height: 50 }}>
              <Image
                src={image}
                alt="Icons for business descriptions"
                layout="fill"
              />
            </div>
            <BusinessTextBox>
              <Typography variant="h5" gutterBottom={true}>
                {title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom={true}>
                {subtitle1}
              </Typography>
              <Typography style={{ marginBottom: 0 }} gutterBottom={true}>
                {subtitle2}
              </Typography>
            </BusinessTextBox>
          </BusinessInnerBox>
          <Divider
            style={{ marginTop: 24 }}
            light={false}
            flexItem={false}
            orientation="horizontal"
          />
        </BusinessInfoItem>
      );
    });
    return infoData;
  };

  const onSubmit = (data) => {};
  return (
    <Wrapper>
      <Hero></Hero>
      <PaymentGuarantee>
        <TextBox>
          <Typography variant="h5">Novelty! Payment guarantee!</Typography>
          <ul>
            <li>
              <Typography>
                100% payment guarantee for bookings from tablebooking.com
              </Typography>
            </li>
            <li>
              <Typography>Up to 50% fewer cancellations</Typography>
            </li>
            <li>
              <Typography>Get paid even at No-shows</Typography>
            </li>
            <a>Read more</a>
          </ul>
        </TextBox>
      </PaymentGuarantee>

      <OnboardingContent>
        <Typography variant="h6">CONNECT YOUR BUSINESS</Typography>
        <Typography style={{ marginTop: 24 }} variant="h4">
          We will help you
        </Typography>
        <Box
          marginTop={5}
          flexWrap="wrap"
          display="flex"
          justifyContent="space-evenly"
          flexDirection="row"
        >
          {renderConnectInfoData()}
        </Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 50,
          }}
        >
          <ThemeProvider theme={darkTheme}>
            <ConnectBusinessBox>
              <Typography gutterBottom={true} align="center" variant="h4">
                Get started
              </Typography>
              <Typography align="center">
                We will help you register so you can get started. Fill in the
                form below and our staff will contact you within the next 24
                hours.
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
                  label="Company name"
                  variant="outlined"
                  name="cafe"
                  inputRef={register()}
                />
                <TextField
                  style={{ marginTop: 10 }}
                  id="outlined-basic"
                  label="VAT Nr"
                  variant="outlined"
                  name="cafe"
                  inputRef={register()}
                />
                <TextField
                  style={{ marginTop: 10 }}
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  name="cafe"
                  inputRef={register()}
                />
                <TextField
                  style={{ marginTop: 10 }}
                  id="outlined-basic"
                  label="Phone number"
                  variant="outlined"
                  name="cafe"
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
                  Send
                </Button>
              </Form>
            </ConnectBusinessBox>
          </ThemeProvider>
        </div>
      </OnboardingContent>
    </Wrapper>
  );
};

const BusinessTextBox = styled(Box)`
  margin-left: 0;
  margin-top: 16px;
  max-width: 450px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-left: 24px;
    margin-top: 0;
  }
`;
const BusinessInnerBox = styled(Box)`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const PaymentGuarantee = styled(Box)`
  background-color: #a13e3e;
  color: white;
  display: flex;
  justify-content: center;
  padding: 24px;
`;
const BusinessInfoItem = styled(Box)`
  margin-top: 24px;
  max-width: 615px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Form = styled.form`
  display: flex;
  max-width: 300px;
  width: 100%;
  div {
    @media (min-width: 768px) {
      min-width: 262px;
    }
  }
  flex-direction: column;
`;
const ConnectBusinessBox = styled(Box)`
  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
  max-width: 600px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background-color: #424242;
  color: white;
  display: flex;

  flex-direction: column;
`;
const TextBox = styled(Box)`
  ul {
    padding-left: 15px;
    margin: 0;
  }
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
  margin-bottom: 50px;
`;

const OnboardingContent = styled(Box)`
  flex-wrap: wrap;
  display: flex;

  flex-direction: column;
  min-height: 60vh;
  margin: 5vw 5vw 5vw 5vw;
  @media (min-width: 930px) {
    margin: 5vw 8vw 5vw 8vw;
  }
`;

export default connectCafe;
