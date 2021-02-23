import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';

import Marquee, { Motion } from 'react-marquee-slider';
import Image from 'next/image';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from '@ctb/dark-theme-provider';

import { SearchBoxComponent } from '@ctb/search-box-component';
import { AuthContext } from '@ctb/auth-context';

interface Props {}

const homePage = (props: Props) => {
  const { companiesMockData }: any = useContext(AuthContext);
  console.log(companiesMockData);

  return (
    <ThemeProvider theme={darkTheme}>
      <Home>
        <Hero>
          <OnboardingMessage>
            <Typography variant="h4">Find a café - order on the go!</Typography>
          </OnboardingMessage>
          <SearchBoxComponent isHeader={false} />
        </Hero>
        <OnboardingContent>
          <OnboardingText>
            <Typography variant="h5">Save time and money</Typography>
            <Typography style={{ fontSize: '12px' }}>
              Instead of staying in queue to visit your favourite café you can
              nice and easy book your table and enjoy your coffee served when
              you arrive at the café. With discount code ILOVECOFFEE get a 50%
              discount at your first reservation.
            </Typography>
          </OnboardingText>
          <ImgWrapper>
            <Image
              src="/static/img/queue.jpg"
              alt="Picture of the author"
              width={640}
              height={380}
            />
          </ImgWrapper>
        </OnboardingContent>

        <Marquee velocity={30} resetAfterTries={50}>
          {companiesMockData &&
            companiesMockData.map((item) => (
              <Motion key={`child-${item.id}`} velocity={0} radius={100}>
                <ImageWrapper image={item.image}></ImageWrapper>
              </Motion>
            ))}
        </Marquee>
      </Home>
    </ThemeProvider>
  );
};
const Hero = styled(Box)`
  color: white;
  display: flex;
  flex-direction: column;

  align-items: center;

  flex-wrap: wrap;
  justify-content: space-evenly;
  background: url('/static/img/hero/coffee-hero.jpg') no-repeat center;
  background-size: cover;
  max-width: 100vw;
  min-height: 470px;
  @media (min-width: 768px) {
    min-height: 44vw;
  }

  @media (min-width: 970px) {
    flex-direction: row;
    justify-content: space-evenly;
  }

  filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.6));
`;

const Home = styled(Box)`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    #c8dbe1;
  position: relative;
`;

const OnboardingText = styled(Box)`
  margin: 0 30px 30px 0;
  max-width: 400px;
`;

const OnboardingMessage = styled(Box)`
  margin: 30px;
`;
const OnboardingContent = styled(Box)`
  /* flex-wrap: wrap; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 5vw 5vw 0 5vw;
  @media (min-width: 930px) {
    justify-content: space-between;
    flex-direction: row;
  }
`;
const ImageWrapper = styled.div`
  background: ${(props) => `url(${props.image}) no-repeat center`};
  background-size: contain;

  position: relative;
  width: 130px;
  height: 100px;
  @media (min-width: 768px) {
    width: 170px;
    height: 130px;
  }
`;

const ImgWrapper = styled.div`
  filter: drop-shadow(0px 7px 10px rgba(0, 0, 0, 0.6));
`;
export default homePage;
