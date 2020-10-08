import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import CreatedBy from "../components/CreatedBy";
import Header from "../components/Header";

export const PrivateRoute = ({ isAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      isAuth ? (
        <div>
          <Header />
          <Component {...props} />
          <CreatedBy />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuth: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);
