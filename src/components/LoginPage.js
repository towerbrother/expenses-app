import React from "react";
import { connect } from "react-redux";
import { startGoogleLogin, startAnonymousLogin } from "./../actions/auth";

export const LoginPage = ({ startGoogleLogin, startAnonymousLogin }) => {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Budget App</h1>
        <p className="box-layout__subtitle">
          It's time to get your expenses under control.
        </p>
        <button className="button" onClick={startGoogleLogin}>
          Login with Google
        </button>
        <button className="button" onClick={startAnonymousLogin}>
          Login as a Guest
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startAnonymousLogin: () => dispatch(startAnonymousLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
