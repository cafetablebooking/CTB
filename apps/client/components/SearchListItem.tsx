import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Image from 'next/image';
import {
  ImageWrapper,
  ListItem,
  ListItemDetails,
} from '../styles/SearchListItemStyles';
interface Props {
  companyName: string;
  vatNr: string;
  phoneNumber: string;
  email: string;
  image: string;
  openingHours: any;
  adress: any;
  distance: number;
}

const SearchListItem = (props: Props) => {
  return (
    <ListItem>
      <ImageWrapper>
        {props.image && (
          <Image
            src={props.image}
            height="150"
            width="150"
            alt="Avatar image of business"
          />
        )}
      </ImageWrapper>
      <ListItemDetails>
        <Typography variant="h5">{props.companyName}</Typography>
        {props.adress && (
          <Typography>
            {props.adress.name} {props.adress.postalCode} {props.adress.city}
          </Typography>
        )}
        {props.openingHours && props.openingHours.isOpen ? (
          <Box color="success.main">
            <Typography>
              Open ({props.openingHours.today.open}-
              {props.openingHours.today.closed})
            </Typography>
          </Box>
        ) : (
          <Box color="error.main">
            <Typography>Closed</Typography>
          </Box>
        )}
      </ListItemDetails>
      {props.distance && <Box>{props.distance} meters away</Box>}
      <Image
        src={'/static/angle-right.svg'}
        height="20"
        alt="Angle right for company cards"
        width="20"
      />
    </ListItem>
  );
};

export default SearchListItem;
