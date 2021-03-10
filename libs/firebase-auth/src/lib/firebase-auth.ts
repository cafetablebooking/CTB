import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

// const app = {
//   apiKey: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId:
//     process.env.NEXT_PUBLIC_CLIENT_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_CLIENT_FIREBASE_APP_ID,
//}
const firebaseConfig = {
  apiKey: 'AIzaSyBJqFWU0QtlqnJpOZDxVRI40QZGJuAAxok',
  authDomain: 'cafetablebooking.firebaseapp.com',
  projectId: 'cafetablebooking',
  storageBucket: 'cafetablebooking.appspot.com',
  messagingSenderId: '527456432823',
  appId: '1:527456432823:web:85ad494b7043576ec6d332',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
// const auth = firebase.auth();
const auth = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).auth()
  : firebase.app().auth();
const functions = firebase.functions();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { firestore, auth, functions, googleProvider, firebase };
