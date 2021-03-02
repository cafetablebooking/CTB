import React, { useContext } from 'react';
import { Typography, Box, TextField, Button, Divider } from '@material-ui/core';

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import {
  Wrapper,
  CoverImage,
  PaymentGuarantee,
  Form,
  ConnectBusinessBox,
  OnboardingContent,
  TextBox,
} from '../../styles/companyDetailStyles';
import { AuthContext } from '@ctb/auth-context';
interface Props {}

const companyDetail = (props: Props) => {
  const { register, handleSubmit, watch, errors } = useForm({});
  const { companies }: any = useContext(AuthContext);
  const router = useRouter();
  const companyId = router.query.pid && router.query.pid[0];

  const company =
    companies && companies.find((item) => item.id === parseInt(companyId));
  console.log(company);

  const onSubmit = (data) => {};
  return (
    <>
      {company && (
        <Wrapper>
          <CoverImage coverImage={company.coverImage}></CoverImage>
          <PaymentGuarantee>
            <TextBox>
              <Typography variant="h5">{company.companyName}</Typography>

              <Typography>
                {company.adress.name} {company.adress.postalCode}{' '}
                {company.adress.city}
              </Typography>
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
            ></Box>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 50,
              }}
            ></div>
          </OnboardingContent>
        </Wrapper>
      )}
    </>
  );
};

export default companyDetail;
