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
  const isDesktop = useMediaQuery('(min-width:768px)');
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
        <Box
          marginTop={3}
          maxWidth="615px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection={isDesktop ? 'row' : 'column'}>
            <div style={{ position: 'relative', width: 50, height: 50 }}>
              <Image src={image} layout="fill" />
            </div>
            <Box
              marginLeft={isDesktop ? 3 : 0}
              marginTop={!isDesktop ? 2 : 0}
              maxWidth="450px"
              display="flex"
              flexDirection="column"
            >
              <Typography variant="h5" gutterBottom={true}>
                {title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom={true}>
                {subtitle1}
              </Typography>
              <Typography gutterBottom={true}>{subtitle2}</Typography>
            </Box>
          </Box>
          <Divider
            style={{ marginTop: 24 }}
            light={false}
            flexItem={false}
            orientation="horizontal"
          />
        </Box>
      );
    });
    return infoData;
  };

  const onSubmit = (data) => {};
  return (
    <Wrapper>
      <Hero></Hero>
      <Box
        bgcolor="#a13e3e"
        color="white"
        display="flex"
        justifyContent="center"
        padding={3}
      >
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
      </Box>

      <OnboardingContent>
        <Typography variant="h6">CONNECT YOUR COMPANY</Typography>
        <Typography variant="h3">We will help you</Typography>
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
              <Typography align="center" variant="h4">
                Connect Business
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
                    height: '56px',
                    alignSelf: 'center',
                  }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Send A Request
                </Button>
              </Form>
            </ConnectBusinessBox>
          </ThemeProvider>
        </div>
      </OnboardingContent>
    </Wrapper>
  );
};
const Form = styled.form`
  display: flex;
  max-width: 400px;

  flex-direction: column;
`;
const ConnectBusinessBox = styled(Box)`
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
