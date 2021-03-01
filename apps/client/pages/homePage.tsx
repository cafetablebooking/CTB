import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';

import Marquee, { Motion } from 'react-marquee-slider';
import Image from 'next/image';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from '@ctb/dark-theme-provider';

import { SearchBoxComponent } from '@ctb/search-box-component';
import { AuthContext } from '@ctb/auth-context';
import OnboardingCard from '../components/OnboardingCard';
import {
  Home,
  Hero,
  OnboardingMessage,
  OnboardingContent,
  OnboardingRight,
  OnboardingText,
  ImageWrapper,
  ImgWrapper,
  MarqueeWrapper,
} from './styles/homePageStyles';
interface Props {}

const homePage = (props: Props) => {
  const { companies }: any = useContext(AuthContext);

  return (
    <ThemeProvider theme={darkTheme}>
      <Home>
        <Hero>
          <OnboardingMessage>
            <Typography variant="h4">Find a table - order on the go!</Typography>
          </OnboardingMessage>
          <SearchBoxComponent isHeader={false} />
        </Hero>
        <OnboardingContent>
          <OnboardingCard />
          <OnboardingRight>
            <OnboardingText>
              <Typography variant="h6" style={{ fontSize: 24 }}>
                Connect your business
              </Typography>
              <Typography style={{ fontSize: '14px' }}>
                We help 9 different service entrepreneurs with booking, payment
                and marketing for their café or restaurant. Try and see how we
                can <a>help</a> you! Do you rather want to talk to an employee?
                Call 0772-111 111
              </Typography>
            </OnboardingText>
            <ImgWrapper>
              <Image
                src="/static/img/restaurantbusinesss.jpg"
                alt="Picture of café or restaurant business"
                width={570}
                height={370}
              />
            </ImgWrapper>
          </OnboardingRight>
        </OnboardingContent>
        <MarqueeWrapper>
          <Marquee velocity={30} resetAfterTries={50}>
            {companies &&
              companies.map((item) => (
                <Motion key={`child-${item.id}`} velocity={0} radius={100}>
                  <ImageWrapper>
                    <Image
                      src={item.image}
                      alt="Avatar logotype of restaurant café company"
                      width={570}
                      height={370}
                    />
                  </ImageWrapper>
                </Motion>
              ))}
          </Marquee>
        </MarqueeWrapper>
      </Home>
    </ThemeProvider>
  );
};

export default homePage;
