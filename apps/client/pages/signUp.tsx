import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@material-ui/core';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Link from 'next/link';

import { useRouter } from 'next/router';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GoogleSignInButton } from '@ctb/google-sign-in-button';
import { registerAccount } from '@ctb/auth-crud';
import { AuthContext } from '@ctb/auth-context';
import { registerSchema } from '@ctb/utils';
import {
  SignInWrapper,
  RedirectMessage,
  FormWrapper,
  InnerFlexItem,
  Form,
} from '../styles/authStyles';
interface Props {}

const signUp = (props: Props) => {
  const { signInWithGoogle }: any = useContext(AuthContext);
  const isDesktop = useMediaQuery('(min-width:768px)');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const googleSignInHandler = () => {
    signInWithGoogle();
    router.push('/dashboard');
  };
  async function onSubmit(data) {
    try {
      await registerAccount(data.email, data.password);
      router.push('/signIn');
    } catch {}
  }

  return (
    <SignInWrapper>
      <RedirectMessage>
        <Typography>Already have an account?</Typography>
        <Link href="/signIn">
          <a>Login here</a>
        </Link>
      </RedirectMessage>
      <Typography style={{ textAlign: 'center', margin: 20 }} variant="h4">
        Create Account
      </Typography>

      <FormWrapper>
        <InnerFlexItem>
          <Form>
            <Typography variant="h5">Register With Google</Typography>
            <GoogleSignInButton
              text="Sign Up With Google"
              googleSignInHandler={googleSignInHandler}
            />
          </Form>
        </InnerFlexItem>
        <Divider
          style={{ margin: '30px 0 20px 0' }}
          orientation={isDesktop ? 'vertical' : 'horizontal'}
          flexItem={isDesktop ? true : false}
        />
        <InnerFlexItem style={{ flex: 1 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">Register With E-mail</Typography>
            <TextField
              style={{ marginTop: '10px' }}
              placeholder="E-mail"
              name="email"
              id="outlined-basic"
              variant="outlined"
              inputRef={register({ required: true })}
            />
            <div style={{ color: 'red' }}>{errors.email?.message}</div>
            <TextField
              style={{ marginTop: '10px' }}
              placeholder="Password"
              name="password"
              type="password"
              id="outlined-basic"
              variant="outlined"
              inputRef={register({ required: true })}
            />
            <div style={{ color: 'red' }}>{errors.password?.message}</div>
            <TextField
              style={{ minWidth: 284.6, marginTop: '10px' }}
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              id="outlined-basic"
              variant="outlined"
              inputRef={register({ required: true })}
            />
            <div style={{ color: 'red' }}>
              {errors.confirmPassword?.message}
            </div>

            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: '10px', height: '56px' }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </InnerFlexItem>
      </FormWrapper>
    </SignInWrapper>
  );
};

export default signUp;
