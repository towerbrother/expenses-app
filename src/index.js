import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import "normalize.css/normalize.css"; // css reset
import "./styles/styles.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import firebase from "./firebase/firebase";

const store = configureStore();

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById("app")
  );
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("log in");
  } else {
    console.log("log out");
  }
});
