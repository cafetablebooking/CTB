import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, Divider } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from '../components/ThemeProviders/DarkThemeProvider';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import {
  BusinessInfoItem,
  BusinessInnerBox,
  BusinessTextBox,
  Wrapper,
  Hero,
  PaymentGuarantee,
  Form,
  ConnectBusinessBox,
  OnboardingContent,
  TextBox,
} from '../styles/connectBusinessStyles';
import { firestore } from '@ctb/firebase-auth';
import Geocode from 'react-geocode';

interface Props {}

const ConnectCafe = (props: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const { register, handleSubmit, watch, errors } = useForm({});
  const [connectInfoData, setConnectInfoData] = useState(null);
  const [adressError, setAdressError] = useState(null);

  const getInfoData = async () => {
    const res = await fetch('/mock/connectInfo.json');
    const data = await res.json();
    setConnectInfoData(data);
  };

  useEffect(() => {
    getInfoData();
  }, []);

  const renderConnectInfoData = () => {
    const infoData =
      connectInfoData &&
      connectInfoData.map((item) => {
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

  const onSubmit = async (data) => {
    console.log(data);
    const {
      vatNr,
      email,
      phoneNumber,
      companyName,
      streetName,
      zipCode,
      city,
    } = data;
    const companiesRef = firestore.collection('company_requests');
    try {
      // const response = await Geocode.fromAddress(
      //   `${streetName} ${city} ${zipCode}`
      // );
      // const { lat, lng } = response && response.results[0].geometry.location;
      // console.log('lan lag', lat, lng);
      await companiesRef.add({
        companyName,
        vatNr,
        email,
        phoneNumber,
        address: {
          city,
          name: streetName,
          postalCode: zipCode,
        },
        // coordinates: {
        //   lat,
        //   lng,
        // },
      });
      setSuccess(true);
      setAdressError(false);
    } catch {
      console.log('what');
      // setAdressError(true);
    }
  };
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
              {!success ? (
                <>
                  <Typography gutterBottom={true} align="center" variant="h4">
                    Get started
                  </Typography>
                  <Typography align="center">
                    We will help you register so you can get started. Fill in
                    the form below and our staff will contact you within the
                    next 24 hours.
                  </Typography>
                  <Divider
                    style={{ width: '80%', margin: '24px 0 24px 0' }}
                    light={false}
                    flexItem={false}
                    orientation="horizontal"
                  />

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Typography style={{ marginTop: 10 }} align="left">
                      Name
                    </Typography>
                    <TextField
                      style={{ marginTop: 10 }}
                      id="outlined-basic"
                      label="Company name"
                      variant="outlined"
                      name="companyName"
                      inputRef={register()}
                      required
                    />
                    <Typography style={{ marginTop: 10 }} align="left">
                      Address
                    </Typography>
                    <TextField
                      style={{ marginTop: 10 }}
                      id="outlined-basic"
                      label="Street name"
                      variant="outlined"
                      name="streetName"
                      inputRef={register()}
                      required
                    />
                    <TextField
                      style={{ marginTop: 10 }}
                      id="outlined-basic"
                      label="ZIP code"
                      variant="outlined"
                      name="zipCode"
                      inputRef={register()}
                      required
                    />
                    <TextField
                      style={{ marginTop: 10 }}
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      name="city"
                      inputRef={register()}
                      required
                    />
                    {adressError && (
                      <Typography
                        color="secondary"
                        style={{ marginTop: 10 }}
                        align="center"
                      >
                        This must be a real adress.
                      </Typography>
                    )}
                    <Typography style={{ marginTop: 10 }} align="left">
                      Information
                    </Typography>
                    <TextField
                      style={{ marginTop: 10 }}
                      id="outlined-basic"
                      label="VAT Nr"
                      variant="outlined"
                      name="vatNr"
                      inputRef={register()}
                      required
                    />
                    <TextField
                      style={{ marginTop: 10 }}
                      id="outlined-basic"
                      label="E-mail"
                      variant="outlined"
                      name="email"
                      inputRef={register()}
                      required
                    />
                    <TextField
                      style={{ marginTop: 10 }}
                      id="outlined-basic"
                      label="Phone number"
                      variant="outlined"
                      name="phoneNumber"
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
                      Send
                    </Button>
                  </Form>
                </>
              ) : (
                <>
                  <Typography variant="h6">Thank you!</Typography>
                  <Typography align="center">
                    We will contact you in a very short of time!
                  </Typography>
                </>
              )}
            </ConnectBusinessBox>
          </ThemeProvider>
        </div>
      </OnboardingContent>
    </Wrapper>
  );
};

export default ConnectCafe;
