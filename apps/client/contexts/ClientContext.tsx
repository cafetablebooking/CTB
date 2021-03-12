import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '@ctb/firebase-auth';
import React from 'react';
import Geocode from 'react-geocode';
import { getCompaniesData } from '../components/utils';
import styled from 'styled-components';
import { AuthContext } from '@ctb/auth-context';
import { useRouter } from 'next/router';
interface Props {
  children: any;
}
export const ClientContext = createContext({});
export const ClientContextProvider = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<any>([]);
  const { setCurrentUser }: any = useContext(AuthContext);
  const router = useRouter();
  const [navigatorPosition, setNavigatorPosition] = useState<any>(null);
  const [bookedInfo, setBookedInfo] = React.useState(null);
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

  const signInWithGoogle = () => {
    return auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const setCompaniesData = async () => {
    const data = await getCompaniesData();
    setCompanies(data);
  };
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
    });

    setCompaniesData();
  }, []);
  return (
    <ClientContext.Provider
      value={{
        signInWithGoogle,
        companies,
        loading,
        setLoading,
        navigatorPosition,
        setNavigatorPosition,
        triggerNavigator,
        bookedInfo,
        setBookedInfo,
      }}
    >
      <FontWrapper>{props.children}</FontWrapper>
    </ClientContext.Provider>
  );
};

const FontWrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;

  button {
    font-weight: bold;
  }
`;
function useClientContext() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(
      'useClientContext must be used within a ClientContextProvider'
    );
  }
  return context;
}

export { useClientContext };
