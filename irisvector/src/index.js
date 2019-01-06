import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import reducers from "redux/reducers";
import thunk from "redux-thunk";
import Reactotron from "reactotron-react-js";

import Auth from "routes/Auth/Auth";
import AuthPages from "./layouts/AuthPages";
import "ReactotronConfig";
import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-pro-react.css";

var hist = createBrowserHistory();
if (process.env.NODE_ENV) {
  Reactotron.connect();
  Reactotron.clear();
}
let store = null;
if (process.env.NODE_ENV) {
  store = Reactotron.createStore(reducers, {}, applyMiddleware(thunk));
} else {
  store = compose(applyMiddleware(thunk))(createStore)(reducers);
}
const persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={hist}>
        <Switch>
          <Route path={"/auth"} component={AuthPages} />;
          <Auth>
            {indexRoutes.map((prop, key) => {
              return (
                <Route path={prop.path} key={key} component={prop.component} />
              );
            })}
          </Auth>
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
