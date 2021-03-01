import { createContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@ctb/firebase-auth';
import React from 'react';
import Geocode from 'react-geocode';
import { useRouter } from 'next/router';
export const AuthContext = React.createContext({});
import styled from 'styled-components';
interface Props {
  children: any;
}

export const AuthContextProvider = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [navigatorPosition, setNavigatorPosition] = useState<any>(null);
  const [companies, setCompanies] = useState<any>([]);
  const router = useRouter();

  Geocode.setApiKey(process.env.NEXT_PUBLIC_CLIENT_GOOGLE_MAPS_API_KEY);

  const triggerNavigator = () => {
    function success(pos) {
      const crd = pos.coords;
      const latitude = crd.latitude;
      const longitude = crd.longitude;
      //   const accuracy = crd.accuracy;

      setNavigatorPosition({
        lat: latitude,
        lng: longitude,
        // accuracy: accuracy,
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  };
  const getCompanies = () => {
    fetch('/mock/companies.json')
      .then((data) => data.json())
      .then((data) => {
        data.map(async (item) => {
          //   const response = await Geocode.fromAddress(
          //     `${item.adress.name} ${item.adress.city} ${item.adress.postalCode}`
          //   );

          //   const { lat, lng } =
          //     response && response.results[0].geometry.location;

          const options = {
            id: item.id,
            companyName: item.companyName,
            vatNr: item.vatNr,
            phoneNumber: item.phoneNumber,
            email: item.email,
            image: item.image,
            openingHours: item.openingHours,
            adress: item.adress,
            coordinates: {
              lat: 59,
              lng: 16,
            },
          };
          setCompanies((prevState) => [...prevState, options]);
        });
      });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
    });
    getCompanies();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        signInWithGoogle,
        navigatorPosition,
        setNavigatorPosition,
        triggerNavigator,
        companies,
      }}
    >
      <FontWrapper>{props.children}</FontWrapper>
    </AuthContext.Provider>
  );
};
const FontWrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;

  button {
    font-weight: bold;
  }
`;
