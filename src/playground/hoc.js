// HOC - a component that render another component
// Reuse code / render hijacking / prop manipulation / abstract state

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>These is private info, please do not share!</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requierAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
};

// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requierAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="These are the details" />,
  document.getElementById("app")
);
