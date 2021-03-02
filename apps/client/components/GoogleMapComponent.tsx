import React from 'react';
import { Wrapper } from '../styles/SearchStyles';
import GoogleMapReact from 'google-map-react';
import Marker from 'apps/client/components/Marker/Marker';

interface Props {
  zoom: number;
  latitude: number;
  longitude: number;
  navigatorPosition: Object;
  getDistance: any;
  filteredData: any;
}

const GoogleMapComponent = (props: Props) => {
  const {
    zoom,
    latitude,
    longitude,
    getDistance,
    navigatorPosition,
    filteredData,
  } = props;
  return (
    <Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_CLIENT_GOOGLE_MAPS_API_KEY,
        }}
        defaultZoom={13}
        zoom={zoom}
        center={[latitude, longitude]}
      >
        {filteredData.map((place) => {
          return (
            <Marker
              key={place.id}
              companyName={place.companyName}
              phoneNumber={place.phoneNumber}
              adress={place.adress}
              image={place.image}
              openingHours={place.openingHours}
              distance={navigatorPosition && getDistance(place)}
              lat={place.coordinates.lat}
              lng={place.coordinates.lng}
            />
          );
        })}
      </GoogleMapReact>
    </Wrapper>
  );
};

export default GoogleMapComponent;
