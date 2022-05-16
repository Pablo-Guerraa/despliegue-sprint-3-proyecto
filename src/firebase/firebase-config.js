import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
  };
   
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const googleAuthProvider = new GoogleAuthProvider();
  const facebookAuthProvider = new FacebookAuthProvider();
  const dataFilms = getFirestore()

  export {
    app,
    googleAuthProvider,
    facebookAuthProvider,
    dataFilms
  }

