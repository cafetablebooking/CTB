import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const InnerFlexItem = styled(Box)`
  display: flex;
  justify-content: center;
  flex: 1;
  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;
export const RedirectMessage = styled(Box)`
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
export const Form = styled.form`
  display: flex;
  max-width: 400px;

  flex-direction: column;
`;
export const SignInWrapper = styled(Box)`
  background: #fff;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 100vh;
`;
export const FormWrapper = styled(Box)`
  margin: 0 5vw 50px 5vw;
  display: flex;

  flex-direction: column;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    min-height: 500px;
    flex-direction: row;
  }
`;
