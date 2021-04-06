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
interface Props {}

const CreateDialogForm = (props: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const { register, handleSubmit, watch, errors } = useForm({});
  const { docs } = useFirestore('tableBookings');

  const { uidValue } = useAuthContext();
  const companyTables =
    docs &&
    docs.find((item) => {
      return item.id === uidValue;
    });

  const onSubmit = async (data) => {
    const { seats, tableName } = data;

    const tableBookings = firestore.collection('tableBookings').doc(uidValue);
    if (companyTables) {
      tableBookings.update({
        resources: firebase.firestore.FieldValue.arrayUnion({
          seats,
          resourceTitle: tableName,
          resourceId: companyTables.resources.length + 1,
        }),
      });
    } else {
      await tableBookings.set({
        resources: [
          {
            seats,
            resourceTitle: tableName,
            resourceId: 1,
          },
        ],
      });
    }
    setSuccess(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <StyledBox>
        {!success ? (
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="outlined-basic"
                label="Table name"
                variant="outlined"
                name="tableName"
                inputRef={register()}
                required
              />
              <TextField
                style={{ marginTop: 10 }}
                id="outlined-basic"
                label="Number of seats"
                variant="outlined"
                type="number"
                name="seats"
                inputRef={register()}
                required
              />

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
        ) : (
          <>
            <Typography variant="h6">Table Created.</Typography>
          </>
        )}
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
export default CreateDialogForm;
