import { firestore, firebase } from '@ctb/firebase-auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box, Divider } from '@material-ui/core';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useFirestore } from '@ctb/use-firestore';
import { useAuthContext } from '@ctb/auth-context';
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable-next-line */

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e976f',
    },
    type: 'dark',
  },
});
interface Props {
  textFields: any;
  submitFunction: (value: any) => void;
  handleClose: () => void;
}

const FieldDialogForm = (props: Props) => {
  const { register, handleSubmit, watch, errors } = useForm({});

  const { textFields, submitFunction, handleClose } = props;

  const renderTextFields = textFields.map((item) => {
    return (
      <TextField
        key={item.name}
        style={{ marginTop: 10 }}
        id="outlined-basic"
        label={item.label}
        variant="outlined"
        name={item.name}
        inputRef={register()}
        required
      />
    );
  });
  const handleSubmitting = (data) => {
    handleClose();
    submitFunction(data);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <StyledBox>
        <>
          <Typography gutterBottom={true} align="center" variant="h4">
            Create Table
          </Typography>
          <Divider
            style={{ width: '80%', margin: '24px 0 24px 0' }}
            light={false}
            flexItem={false}
            orientation="horizontal"
          />
          <Form onSubmit={handleSubmit(handleSubmitting)}>
            {renderTextFields}
            <Button
              style={{
                marginTop: 24,
                width: '242.5px',
                height: '56px',
                alignSelf: 'center',
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Create
            </Button>
          </Form>
        </>
      </StyledBox>
    </ThemeProvider>
  );
};
export const StyledBox = styled(Box)`
  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
  max-width: 600px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  background-color: #424242;
  color: white;
  display: flex;

  flex-direction: column;
`;
export const Form = styled.form`
  display: flex;
  max-width: 300px;
  width: 100%;
  div {
    @media (min-width: 768px) {
      min-width: 262px;
    }
  }
  flex-direction: column;
`;
export default FieldDialogForm;
