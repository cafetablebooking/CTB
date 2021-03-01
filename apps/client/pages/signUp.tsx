import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@material-ui/core';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Link from 'next/link';

import { useRouter } from 'next/router';
import * as Yup from 'yup';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GoogleSignInButton } from '@ctb/google-sign-in-button';
import { registerAccount } from '@ctb/auth-crud';
import { AuthContext } from '@ctb/auth-context';
interface Props {}

const signUp = (props: Props) => {
  const { signInWithGoogle }: any = useContext(AuthContext);
  const isDesktop = useMediaQuery('(min-width:768px)');
  const [error, setError] = useState<string>('');
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(60, 'Maximum 60 symbols')
      .required('This field is required.'),
    password: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(60, 'Maximum 60 symbols')
      .required('This field is required.'),
    confirmPassword: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(60, 'Maximum 60 symbols')
      .required('This field is required.')
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          "Password and Confirm Password didn't match"
        ),
      }),
  });

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

const InnerFlexItem = styled(Box)`
  display: flex;
  justify-content: center;
  flex: 1;
  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;
const RedirectMessage = styled(Box)`
  justify-content: center;
  display: flex;
  background: #aaddd8;
  padding: 20px;
  a {
    display: flex;
    align-items: center;
    margin-left: 4px;
    text-decoration: none;
  }
`;
const Form = styled.form`
  display: flex;
  max-width: 400px;

  flex-direction: column;
`;
const SignInWrapper = styled(Box)`
  background: #fff;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 100vh;
`;
const FormWrapper = styled(Box)`
  margin: 0 5vw 50px 5vw;
  display: flex;

  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    min-height: 500px;
    flex-direction: row;
  }
`;

export default signUp;
