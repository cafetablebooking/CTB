import React, { useEffect, useState } from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';

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
  TitleCompany,
} from 'apps/client/styles/companyDetailStyles';
import Image from 'next/image';

import { useClientContext } from 'apps/client/contexts/ClientContext';

import PaymentDialogComponent from './PaymentDialogComponent';
import ConfirmDialogBoxComponent from './ConfirmDialogBoxComponent';

import CalendarComponent from 'apps/client/components/CalendarComponent';
import { getTableBookings } from 'apps/client/components/utils';

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
  const isDesktop = useMediaQuery('(min-width:768px)');
  const { companies, bookedInfo, setBookedInfo }: any = useClientContext();
  const router = useRouter();
  const companyId = router.query.pid && router.query.pid[0];
  const company = companies && companies.find((item) => item.id === companyId);
  const [openConfirmBox, setOpenConfirmBox] = useState<boolean>(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [success, setSuccess] = useState<boolean>(false);
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
          {company.coverImage && (
            <CoverImage coverimage={company.coverImage}></CoverImage>
          )}
          <Separator>
            <TitleCompany>
              <ImageOuterCircle>
                {company.image && (
                  <ImageInnerCircle>
                    <Image
                      src={company.image}
                      alt="Avatar Image For Companies"
                      layout="fill"
                    />
                  </ImageInnerCircle>
                )}
              </ImageOuterCircle>
              <TextBox>
                <Typography align={isDesktop ? 'left' : 'center'} variant="h5">
                  {company.companyName}
                </Typography>
                {company.adress && (
                  <Typography align={isDesktop ? 'left' : 'center'}>
                    {company.adress.name} {company.adress.postalCode}{' '}
                    {company.adress.city}
                  </Typography>
                )}
              </TextBox>
            </TitleCompany>
          </Separator>

          <PaymentDialogComponent
            success={success}
            setSuccess={setSuccess}
            company={company}
            tableBookings={tableBookings}
            selectedValue={selectedValue}
            bookedInfo={bookedInfo}
            paymentDialogOpen={paymentDialogOpen}
            onClose={handlePaymentDialogClose}
          />

          {bookedInfo && (
            <ConfirmDialogBoxComponent
              handlePaymentDialog={handlePaymentDialog}
              tableBookings={tableBookings}
              selectedValue={selectedValue}
              bookedInfo={bookedInfo}
              openConfirmBox={openConfirmBox}
              onClose={handleConfirmBoxClose}
              companyId={companyId}
            />
          )}

          <CompanyContent>
            <OpeningHours>
              <Typography variant="h6">Bookable times</Typography>
              {company.openingHours && renderOpeniningHours()}
            </OpeningHours>
            <CalendarComponent
              company={company}
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
