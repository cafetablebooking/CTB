import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const MarqueeWrapper = styled.div`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const OnboardingRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5vw;
  @media (min-width: 930px) {
    margin-top: 0;
    margin-left: 100px;
  }
`;
export const Hero = styled(Box)`
  color: white;
  display: flex;
  flex-direction: column;

  align-items: center;
  margin-top: -73.6px;
  padding-top: 73.6px;

  flex-wrap: wrap;
  justify-content: flex-start;
  background: url('/static/img/hero/coffee-hero.jpg') no-repeat center;
  background-size: cover;
  max-width: 100vw;
  min-height: 90vh;
  @media (min-width: 768px) {
    min-height: 44vw;
    justify-content: space-evenly;
  }

  @media (min-width: 970px) {
    flex-direction: row;
    justify-content: space-evenly;
  }

  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
`;

export const Home = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
`;

export const OnboardingText = styled(Box)`
  background: white;
  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
  border-radius: 4px;
  border: 1px solid gold;
  padding: 20px;

  margin: 0 0 5vw 0;
  max-width: 100%;
  @media (min-width: 480px) {
    max-width: 500px;
  }
`;

export const OnboardingMessage = styled(Box)`
  margin: 30px;
`;
export const OnboardingContent = styled(Box)`
  /* flex-wrap: wrap; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5vw 5vw 0 5vw;
  @media (min-width: 930px) {
    margin: 5vw 15vw 0 15vw;
    justify-content: space-between;
    flex-direction: row;
  }
`;
export const ImageWrapper = styled.div`
  background-size: contain;
  position: relative;

  img {
    border-radius: 4px;

    width: 170px;
    height: 130px;
  }
`;

export const ImgWrapper = styled.div`
  filter: drop-shadow(0px 7px 10px rgba(0, 0, 0, 0.6));
  img {
    border-radius: 4px;
  }
`;
