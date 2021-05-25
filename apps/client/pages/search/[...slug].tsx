import React, { useState, useEffect, useContext } from 'react';
import {
  FormControl,
  NativeSelect,
  InputLabel,
  Typography,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../components/ThemeProviders/LightThemeProvider';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SearchBoxComponent from '../../components/Header/SearchBoxComponent';
import { CSSTransition } from 'react-transition-group';

import Geocode from 'react-geocode';
import {
  Search,
  SearchList,
  SearchListTop,
  StyledTransitionGroup,
} from '../../styles/SearchStyles';
import { getDistance, getOpeningHours } from '../../components/utils';
import Link from 'next/link';

import SearchListItem from 'apps/client/components/SearchListItem';
import GoogleMapComponent from 'apps/client/components/GoogleMapComponent';
import { ClientContext } from 'apps/client/contexts/ClientContext';

const SearchPid = () => {
  const { companies, navigatorPosition }: any = useContext(ClientContext);
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width:768px)');
  const [filter, setFilter] = React.useState<string>('');
  const [sortBy, setSortBy] = React.useState<string>('distance');
  const pid: any = router.query.slug && router.query.slug[0];
  const type: any = router.query.slug && router.query.slug[1];
  const [latitude, setLat] = useState(0);
  const [longitude, setLng] = useState(0);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    getCoordinates();
  }, [pid, type]);
  const getCoordinates = async () => {
    let latitude = 0;
    let longitude = 0;
    let zoom = 0;

    if (pid && pid.length > 0 && type === 'location' && navigatorPosition) {
      if (pid === 'Check my position') {
        latitude = navigatorPosition.lat;
        longitude = navigatorPosition.lng;
        zoom = 12;
      } else {
        const response = await Geocode.fromAddress(`${pid}`);
        const { lat, lng } = response && response.results[0].geometry.location;
        latitude = lat;
        longitude = lng;
        zoom = 12;
      }
    } else {
      if (pid === 'Check my position') {
        const response = await Geocode.fromAddress(`Sweden`);
        const { lat, lng } = response && response.results[0].geometry.location;
        latitude = lat;
        longitude = lng;
        zoom = 12;
      } else {
        if (type === 'cafe') {
          const response = await Geocode.fromAddress(`Sweden`);
          const { lat, lng } =
            response && response.results[0].geometry.location;
          latitude = lat;
          longitude = lng;
          zoom = 7;
        } else {
          const response = await Geocode.fromAddress(`${pid}`);
          const { lat, lng } =
            response && response.results[0].geometry.location;
          latitude = lat;
          longitude = lng;
          zoom = 12;
        }
      }
    }
    setLat(latitude);
    setLng(longitude);
    setZoom(zoom);
  };

  let filteredData = null;
  if (type === 'location' && pid !== 'Check my position') {
    filteredData =
      companies &&
      companies.filter((item) => {
        const adress = `${item.adress.city} ${item.adress.name} ${item.adress.postalCode}`;

        return adress.toLowerCase().includes(pid.toLowerCase());
      });
  } else {
    if (pid === 'Check my position') {
      filteredData = companies && companies;
    } else {
      filteredData =
        companies &&
        companies.filter((item) => {
          return item.companyName.toLowerCase().includes(pid.toLowerCase());
        });
    }
  }
  if (filter) {
    filteredData =
      companies &&
      companies.filter((item) => {
        const pidItem = item.companyName
          .toLowerCase()
          .includes(pid.toLowerCase());
        const date = new Date();
        const getDay = date.getDay();
        if (filter === 'open') {
          return getOpeningHours(item.openingHours, getDay) && pidItem;
        } else if (filter === 'closed') {
          return !getOpeningHours(item.openingHours, getDay) && pidItem;
        } else {
          return pidItem;
        }
      });
  }
  if (sortBy) {
    filteredData.sort(function (a, b) {
      if (navigatorPosition && sortBy === 'distance') {
        return (
          getDistance(a, navigatorPosition.lat, navigatorPosition.lng) -
          getDistance(b, navigatorPosition.lat, navigatorPosition.lng)
        );
      } else if (sortBy === 'az' || sortBy === 'za') {
        let nameA;
        let nameB;
        if (sortBy === 'az') {
          nameA = a.companyName.toUpperCase();
          nameB = b.companyName.toUpperCase();
        } else {
          nameB = a.companyName.toUpperCase();
          nameA = b.companyName.toUpperCase();
        }

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      {!isDesktop && <SearchBoxComponent isHeader={false} />}
      <Search>
        <SearchList>
          <SearchListTop>
            <FormControl>
              <InputLabel id="demo-simple-select">Filter</InputLabel>
              <NativeSelect
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                inputProps={{
                  name: 'age',
                  id: 'age-native-helper',
                }}
              >
                <option value={'all'}>All</option>
                <option value={'open'}>Open</option>
                <option value={'closed'}>Closed</option>
              </NativeSelect>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select">Sort By:</InputLabel>
              <NativeSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                inputProps={{
                  name: 'age',
                  id: 'age-native-helper',
                }}
              >
                <option value="distance">Distance</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </NativeSelect>
            </FormControl>
            <Typography
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                margin: '0',
              }}
            >
              {filteredData.length} hits
            </Typography>
          </SearchListTop>
          <StyledTransitionGroup>
            {filteredData &&
              filteredData.map((item) => {
                const date = new Date();
                const getDay = date.getDay();
                return (
                  <CSSTransition key={item.id} timeout={500} classNames="item">
                    <Link href={`/company/${item.id}`}>
                      <a>
                        <SearchListItem
                          companyName={item.companyName}
                          vatNr={item.vatNr}
                          phoneNumber={item.phoneNumber}
                          email={item.email}
                          image={item.image}
                          openingHours={getOpeningHours(
                            item.openingHours,
                            getDay
                          )}
                          adress={item.adress}
                          distance={
                            navigatorPosition &&
                            getDistance(
                              item,
                              navigatorPosition.lat,
                              navigatorPosition.lng
                            )
                          }
                          key={item.id}
                        />
                      </a>
                    </Link>
                  </CSSTransition>
                );
              })}
          </StyledTransitionGroup>
        </SearchList>
        {zoom > 0 && (
          <GoogleMapComponent
            zoom={zoom}
            latitude={latitude}
            longitude={longitude}
            navigatorPosition={navigatorPosition}
            getDistance={getDistance}
            filteredData={filteredData}
          />
        )}
      </Search>
    </ThemeProvider>
  );
};

export default SearchPid;
