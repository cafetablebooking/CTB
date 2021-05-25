import React, { useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';

interface Props {
  companyName: string;
  phoneNumber: string;
  image: string;
  openingHours: any;
  adress: any;
  distance: number;
  node: any;
}

const MarkerCard = (props: Props) => {
  return (
    <Card ref={props.node}>
      {props.image && (
        <ImageWrapper>
          <Image
            src={props.image}
            alt="Avatar image for companies"
            layout="fill"
          />
        </ImageWrapper>
      )}
      <ListItemDetails>
        <Typography variant="h6">{props.companyName}</Typography>
        {props.adress && (
          <Typography>
            {props.adress.name} {props.adress.postalCode} {props.adress.city}
          </Typography>
        )}
        <Typography color="secondary">Closed</Typography>
      </ListItemDetails>
      {props.distance && <Box>{props.distance} meters away</Box>}
      <Image
        src={'/static/angle-right.svg'}
        alt="Angle right icon for cards"
        height="20"
        width="20"
      />
    </Card>
  );
};
const ImageWrapper = styled.div`
  clip-path: circle(50%);
  position: relative;
  width: 100px;
  height: 100px;
  object-fit: contain;
`;
const ListItemDetails = styled(Box)`
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Card = styled(Box)`
  cursor: pointer;
  z-index: 11;
  position: absolute;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 40px;
  filter: drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.6));
  transition: all 0.1s ease-in;
`;

export default MarkerCard;
