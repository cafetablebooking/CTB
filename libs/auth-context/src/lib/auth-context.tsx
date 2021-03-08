import { useEffect, useState } from 'react';
import { auth } from '@ctb/firebase-auth';
import React from 'react';

export const AuthContext = React.createContext({});
import styled from 'styled-components';

interface Props {
  children: any;
}

export const AuthContextProvider = (props: Props) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
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
