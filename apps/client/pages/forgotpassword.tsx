import React, { useContext, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@material-ui/core';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Link from 'next/link';
import { AuthContext } from '@ctb/auth-context';
import { resetPassword } from '@ctb/auth-crud';
import * as Yup from 'yup';

interface Props {}

const ForgotPassword = (props: Props) => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { loading, setLoading }: any = useContext(AuthContext);
  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('This field is required.'),
  });

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  async function onSubmit(data) {
    try {
      setLoading(true);
      setMessage('');
      setError('');

      await resetPassword(data.email);
      setMessage('Check your inbox for futher instructions!');
      setLoading(false);
    } catch {
      setError('Failed to reset password');
      setLoading(false);
    }
  }

  return (
    <SignInBox>
      <Typography style={{ textAlign: 'center', margin: '12px' }} variant="h4">
        Forgot Password
      </Typography>

      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <TextField
            style={{ marginTop: '10px' }}
            placeholder="E-mail"
            name="email"
            inputRef={register({ required: true })}
          />

          <div style={{ color: 'red' }}>{errors.email?.message}</div>
          {loading ? <CircularProgress /> : <p>{message}</p>}
          <Button
            color="primary"
            variant="contained"
            style={{ marginTop: '10px', height: '56px', width: 245.2 }}
            type="submit"
          >
            Reset Password
          </Button>
          <RedirectMessage>
            <Link href="/signIn">
              <a>Login</a>
            </Link>
          </RedirectMessage>
        </Form>
      </FormWrapper>
    </SignInBox>
  );
};

const RedirectMessage = styled(Box)`
  justify-content: center;
  display: flex;
  margin: 10px;
  a {
    display: flex;
    align-items: center;
    margin-left: 4px;
    text-decoration: none;
  }
`;
const Form = styled.form`
  display: flex;

  flex-direction: column;
`;
const SignInBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;
const FormWrapper = styled(Box)`
  display: flex;
  justify-content: space-evenly;
`;

export default ForgotPassword;
