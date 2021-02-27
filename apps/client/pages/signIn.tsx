import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Link from 'next/link';
import { AuthContext } from '@ctb/auth-context';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import LoginRoute from '../components/LoginRoute';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GoogleSignInButton } from '@ctb/google-sign-in-button';
interface Props {}

const SignIn = (props: Props) => {
  const isDesktop = useMediaQuery('(min-width:768px)');
  const [error, setError] = useState<string>('');
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('This field is required.'),
    password: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(60, 'Maximum 60 symbols')
      .required('This field is required.'),
  });

  const { login, signInWithGoogle }: any = useContext(AuthContext);
  const router = useRouter();

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const googleSignInHandler = () => {
    signInWithGoogle();
    router.push('/dashboard');
  };
  async function onSubmit(data) {
    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch {
      setError('Wrong email or password.');
    }
  }

  return (
    <SignInWrapper>
      <RedirectMessage>
        <Typography>No user account?</Typography>
        <Link href="/signUp">
          <a>Please register here</a>
        </Link>
      </RedirectMessage>
      <Typography style={{ textAlign: 'center', margin: 20 }} variant="h4">
        Welcome
      </Typography>

      <FormWrapper>
        <InnerFlexItem>
          <Form>
            <Typography variant="h5">Login With Google</Typography>
            <GoogleSignInButton
              text="Sign In With Google"
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
            <Typography variant="h5">Login With E-mail</Typography>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <RedirectMessage style={{ background: 'inherit' }}>
              <Typography>Forgot your password?</Typography>
              <Link href="/forgotpassword">
                <a>Click Here</a>
              </Link>
            </RedirectMessage>
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
  margin: 0 5vw 5vw 5vw;
  display: flex;

  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    min-height: 500px;
    flex-direction: row;
  }
`;

export default LoginRoute(SignIn);
