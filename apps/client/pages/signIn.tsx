import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Divider } from '@material-ui/core';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginRoute from '../components/LoginRoute';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { loginSchema } from '@ctb/yup-resolvers';
import {
  SignInWrapper,
  RedirectMessage,
  FormWrapper,
  InnerFlexItem,
  Form,
} from '../styles/authStyles';
import { ClientContext } from '../contexts/ClientContext';
import { useAuthContext } from '@ctb/auth-context';
interface Props {}

const SignIn = (props: Props) => {
  const isDesktop = useMediaQuery('(min-width:768px)');
  const [error, setError] = useState<string>('');
  const { signInWithGoogle, login }: any = useAuthContext();
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

export default LoginRoute(SignIn);
