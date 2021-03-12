import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';

import { useRouter } from 'next/router';

import {
  Wrapper,
  CoverImage,
  Separator,
  CompanyContent,
  OpeningHours,
  TextBox,
} from '../../styles/companyDetailStyles';
import {
  ImageInnerCircle,
  ImageOuterCircle,
} from 'apps/client/styles/companyDetailStyles';
import Image from 'next/image';

import { useClientContext } from 'apps/client/contexts/ClientContext';

import PaymentDialogComponent from './PaymentDialogComponent';
import ConfirmDialogBoxComponent from './ConfirmDialogBoxComponent';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CalendarComponent from 'apps/client/components/CalendarComponent';
import { getTableBookings } from 'apps/client/components/utils';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_CLIENT_STRIPE_PUBLISHABLE_KEY
);

interface Props {}
type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

const ValueMap: { [value in WeekDay]: string } = {
  Sun: 'Sunday',
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
} as const;
const companyDetail = (props: Props) => {
  const { companies, bookedInfo, setBookedInfo }: any = useClientContext();
  const router = useRouter();
  const companyId = router.query.pid && router.query.pid[0];
  const company = companies && companies.find((item) => item.id === companyId);

  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [tableBookings, setTableBookings] = useState(null);

  const setAllTableBookings = async () => {
    const data = await getTableBookings();
    setTableBookings(data);
  };

  useEffect(() => {
    setAllTableBookings();
  }, []);
  const handlePaymentDialog = () => {
    setPaymentDialogOpen(true);
    setOpenConfirmBox(false);
    setSuccess(false);
  };
  const handleConfirmBoxClose = (value: string) => {
    setOpenConfirmBox(false);
    setSelectedValue(value);
  };
  const handlePaymentDialogClose = (value: string) => {
    setPaymentDialogOpen(false);

    setSelectedValue(value);
  };
  const renderOpeniningHours = () => {
    const openingDay =
      company &&
      company.openingHours.map((item) => {
        const weekDay = ValueMap[item.day];

        return (
          <div key={item.day}>
            <Typography variant="body2">
              <b>{weekDay}</b>
            </Typography>
            <Typography variant="caption">
              {item.open + '-' + item.closed}
            </Typography>
          </div>
        );
      });
    return openingDay;
  };

  return (
    <>
      {company && (
        <Wrapper>
          <CoverImage coverimage={company.coverImage}></CoverImage>

          <Separator>
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                left: '5vw',
              }}
            >
              <ImageOuterCircle>
                <ImageInnerCircle>
                  <Image
                    src={company.image}
                    alt="Avatar Image For Companies"
                    layout="fill"
                  />
                </ImageInnerCircle>
              </ImageOuterCircle>
              <TextBox>
                <Typography variant="h5">{company.companyName}</Typography>

                <Typography>
                  {company.adress.name} {company.adress.postalCode}{' '}
                  {company.adress.city}
                </Typography>
              </TextBox>
            </div>
            <Button
              style={{
                marginRight: '5vw',
                width: '242.5px',
                height: '56px',
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Book now
            </Button>
          </Separator>
          <Elements stripe={stripePromise}>
            <PaymentDialogComponent
              success={success}
              setSuccess={setSuccess}
              company={company}
              tableBookings={tableBookings}
              selectedValue={selectedValue}
              bookedInfo={bookedInfo}
              open={paymentDialogOpen}
              onClose={handlePaymentDialogClose}
            />
          </Elements>
          {bookedInfo && (
            <ConfirmDialogBoxComponent
              handlePaymentDialog={handlePaymentDialog}
              tableBookings={tableBookings}
              selectedValue={selectedValue}
              bookedInfo={bookedInfo}
              open={openConfirmBox}
              onClose={handleConfirmBoxClose}
            />
          )}
          <CompanyContent>
            <OpeningHours>
              <Typography variant="h6">Bookable times</Typography>
              {renderOpeniningHours()}
            </OpeningHours>
            <CalendarComponent
              success={success}
              setOpenConfirmBox={setOpenConfirmBox}
              setBookedInfo={setBookedInfo}
              companyId={companyId}
            />
          </CompanyContent>
        </Wrapper>
      )}
    </>
  );
};

export default companyDetail;
