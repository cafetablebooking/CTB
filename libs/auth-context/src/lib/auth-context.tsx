/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, useContext } from 'react';
import { auth, googleProvider, functions } from '@ctb/firebase-auth';
import React from 'react';
import { useLocalStorage } from '@ctb/use-local-storage';

export const AuthContext = createContext<AuthProps | null>(null);

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
  uidValue: any;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [uidValue, setUidValue] = useLocalStorage('uid', '');
  const ADMIN_USERS = { Ramy: 'ramy.niranjan@gmail.com' };

  const signup = async (email, password, name) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({ displayName: name });
      if (email === ADMIN_USERS[name]) {
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ email });
        // const { claims } = await user.getIdTokenResult(true);
      }

      setUser(user);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      // const { claims } = await auth.currentUser.getIdTokenResult();
      // console.log(claims);
      setUser(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = (user) => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await auth.signInWithPopup(googleProvider);
      setUser(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUidValue(user.uid);
      } else {
        setUser(false);
        setUidValue('');
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
        uidValue,
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
