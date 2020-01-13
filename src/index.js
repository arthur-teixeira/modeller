import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import RtlLayout from "layouts/RTL.jsx";
import AdminLayout from "layouts/Admin.jsx";

import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";

import { Provider } from "react-redux";
import configureStore from "store";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/login-page" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

