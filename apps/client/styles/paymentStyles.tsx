import styled from 'styled-components';
import { Box } from '@material-ui/core';
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
export const PaymentBox = styled(Box)`
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
  /* @media (min-width: 768px) {
    min-width: 600px;
  } */
`;

export const CardDetails = styled(Box)`
  display: flex;
  margin-top: 10px;
  div {
    min-width: 0;
    &:nth-child(1) {
      margin-right: 10px;
    }
  }
`;
