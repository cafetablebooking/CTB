import { auth, googleProvider } from '@ctb/firebase-auth';

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
