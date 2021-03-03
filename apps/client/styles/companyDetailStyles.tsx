import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const BusinessTextBox = styled(Box)`
  margin-left: 0;
  margin-top: 16px;
  max-width: 450px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-left: 24px;
    margin-top: 0;
  }
`;
export const BusinessInnerBox = styled(Box)`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
export const PaymentGuarantee = styled(Box)`
  align-items: center;
  background-color: #a13e3e;
  color: white;
  display: flex;
  justify-content: flex-end;
  padding: 24px;
`;
export const BusinessInfoItem = styled(Box)`
  margin-top: 24px;
  max-width: 615px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
export const ConnectBusinessBox = styled(Box)`
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
export const TextBox = styled(Box)`
  margin-left: 20px;
`;

export const CoverImage = styled(Box)`
  color: white;
  display: flex;
  flex-direction: column;

  align-items: center;

  flex-wrap: wrap;
  justify-content: space-evenly;
  background: ${(props) => `url(${props.coverImage}) no-repeat center`};
  background-size: cover;
  max-width: 100vw;
  min-height: 300px;
  @media (min-width: 768px) {
  }

  @media (min-width: 970px) {
    flex-direction: row;
    justify-content: space-evenly;
  }

  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
`;

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
  margin-bottom: 50px;
`;
export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #d6d6d6;
  justify-content: center;
  position: relative;
  width: 200px;
  height: 200px;
  clip-path: circle(50%);
  img {
    border-radius: 4px;
  }
`;
export const OnboardingContent = styled(Box)`
  flex-wrap: wrap;
  display: flex;

  flex-direction: column;
  min-height: 60vh;
  margin: 5vw 5vw 5vw 5vw;
  @media (min-width: 930px) {
    margin: 5vw 8vw 5vw 8vw;
  }
`;
