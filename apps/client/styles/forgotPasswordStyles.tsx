import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const RedirectMessage = styled(Box)`
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
export const Form = styled.form`
  display: flex;

  flex-direction: column;
`;
export const SignInBox = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;
export const FormWrapper = styled(Box)`
  display: flex;
  justify-content: space-evenly;
`;
