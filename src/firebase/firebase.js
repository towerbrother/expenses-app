import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA026SwOqf7PqGHa2nF7_Fi__6kgqpkd-g",
  authDomain: "tower-budget-app.firebaseapp.com",
  databaseURL: "https://tower-budget-app.firebaseio.com",
  projectId: "tower-budget-app",
  storageBucket: "tower-budget-app.appspot.com",
  messagingSenderId: "31373530907",
  appId: "1:31373530907:web:8d790c1077d1d90ba265be",
  measurementId: "G-6GDY7X9ERN",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
