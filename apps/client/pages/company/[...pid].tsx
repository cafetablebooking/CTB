import React, { useContext } from 'react';
import { Typography, Box, TextField, Button, Divider } from '@material-ui/core';

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import {
  Wrapper,
  CoverImage,
  PaymentGuarantee,
  OnboardingContent,
  TextBox,
} from '../../styles/companyDetailStyles';
import { AuthContext } from '@ctb/auth-context';
import { ImageWrapper } from 'apps/client/styles/companyDetailStyles';
import Image from 'next/image';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Props {}

const companyDetail = (props: Props) => {
  const { register, handleSubmit, watch, errors } = useForm({});
  const { companies }: any = useContext(AuthContext);
  const router = useRouter();
  const companyId = router.query.pid && router.query.pid[0];

  const company =
    companies && companies.find((item) => item.id === parseInt(companyId));
  console.log(company && company.openingHours);

  const onSubmit = (data) => {};
  return (
    <>
      {company && (
        <Wrapper>
          <CoverImage coverImage={company.coverImage}></CoverImage>

          <PaymentGuarantee>
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                left: '5vw',
              }}
            >
              <ImageWrapper>
                <Image src={company.image} objectfit="contain" layout="fill" />
              </ImageWrapper>

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
          </PaymentGuarantee>

          <OnboardingContent>
            <Calendar
              defaultView={'day'}
              min={new Date(2020, 1, 0, 9, 0, 0)}
              max={new Date(2020, 1, 0, 21, 0, 0)}
              localizer={localizer}
              events={company.tables}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </OnboardingContent>
        </Wrapper>
      )}
    </>
  );
};

export default companyDetail;
