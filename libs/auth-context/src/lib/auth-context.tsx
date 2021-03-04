/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, useContext } from 'react';
import { auth, googleProvider } from '@ctb/firebase-auth';
import React from 'react';

export const AuthContext = createContext<AuthProps>(null);

interface Props {
  children: any;
}
interface AuthProps {
  signup: any;
  login: any;
  logout: any;
  resetPassword: any;
  signInWithGoogle: any;
  user: any;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);

  const signup = (email, password, name) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user.updateProfile({ displayName: name });
        setUser(response.user);
        return response.user;
      });
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };
  const logout = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  const signInWithGoogle = () => {
    return auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        resetPassword,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
}

export { useAuthContext, AuthContextProvider };
