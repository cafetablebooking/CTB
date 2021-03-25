import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { creatCompanyUserSchema } from '@ctb/yup-resolvers';
import { functions } from '@ctb/firebase-auth';

import Layout from '../../components/layout/layout';
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { CTBtheme } from '@ctb/types';

/* eslint-disable-next-line */
export interface CreateCompanyUserProps {}

const useStyles = makeStyles((theme: CTBtheme) => ({
  mainContainer: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '500px',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
  },
}));

export function CreateCompanyUser(props: CreateCompanyUserProps) {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(creatCompanyUserSchema),
  });

  const onSubmit = async ({ displayName, email, password, message }) => {
    const createUser = await functions.httpsCallable('createUser');
    createUser({ email, password, displayName });
    const setRole = await functions.httpsCallable('setRole');
    setRole({ email, companyUser: true, admin: false });
  };

  const classes = useStyles();

  return (
    <Layout>
      <Typography variant="h4" className={classes.text}>
        Create Company user/Send mail
      </Typography>
      <Grid
        justify="center"
        alignItems="center"
        container
        className={classes.mainContainer}
      >
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="name"
            label="Display Name"
            name="displayName"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <TextField
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="message"
            label="Message"
            type="text"
            id="message"
            multiline
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create/Send-mail
          </Button>
        </form>
      </Grid>
    </Layout>
  );
}

export default CreateCompanyUser;
