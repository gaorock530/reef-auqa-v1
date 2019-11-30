import React from "react";
import {Route, Redirect} from "react-router-dom";

export default ({ children, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        login ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}