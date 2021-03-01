import { auth, googleProvider } from '@ctb/firebase-auth';
import { useContext } from 'react';

export const registerAccount = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
export const logout = () => {
  return auth.signOut();
};
export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};
export const signInWithGoogle = () => {
  return auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      setCurrentUser(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
