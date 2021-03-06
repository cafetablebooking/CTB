import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
// import * as admin from 'firebase-admin';
const firebaseConfig = {
  //   apiKey: process.env.CLIENT_FIREBASE_API_KEY,
  //   authDomain: process.env.CLIENT_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.CLIENT_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.CLIENT_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.CLIENT_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.CLIENT_FIREBASE_APP_ID,
  apiKey: 'AIzaSyBJqFWU0QtlqnJpOZDxVRI40QZGJuAAxok',
  authDomain: 'cafetablebooking.firebaseapp.com',
  projectId: 'cafetablebooking',
  storageBucket: 'cafetablebooking.appspot.com',
  messagingSenderId: '527456432823',
  appId: '1:527456432823:web:85ad494b7043576ec6d332',
};

firebase.initializeApp(firebaseConfig);
// admin.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

const googleProvider = new firebase.auth.GoogleAuthProvider();
// if (!firebase.apps.length) {
//   firebase.initializeApp(app);
// }

// export const auth = !firebase.apps.length
//   ? firebase.initializeApp(app).auth()
//   : firebase.app().auth();

export { firestore, auth, functions, googleProvider };
