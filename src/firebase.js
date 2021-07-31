import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCIAJ8wX83E_GKpy-KKUWuIg2RiiiMGCtA",
    authDomain: "tolumessanger.firebaseapp.com",
    projectId: "tolumessanger",
    storageBucket: "tolumessanger.appspot.com",
    messagingSenderId: "787015104606",
    appId: "1:787015104606:web:fd35f9fac02e292cd85ccf",
    measurementId: "G-VL5MDCELLX",
  })
  .auth();
