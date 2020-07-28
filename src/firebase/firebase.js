import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyA026SwOqf7PqGHa2nF7_Fi__6kgqpkd-g",
//   authDomain: "tower-budget-app.firebaseapp.com",
//   databaseURL: "https://tower-budget-app.firebaseio.com",
//   projectId: "tower-budget-app",
//   storageBucket: "tower-budget-app.appspot.com",
//   messagingSenderId: "31373530907",
//   appId: "1:31373530907:web:8d790c1077d1d90ba265be",
//   measurementId: "G-6GDY7X9ERN",
// };

firebase.initializeApp(firebaseConfig);

export default firebase;
