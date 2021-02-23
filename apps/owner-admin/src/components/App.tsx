/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// components
import Layout from './layout/layout';

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Layout} />
        {/* <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/dashboard" />}
          /> */}
        {/* <PrivateRoute path="/app" component={Layout} />
          <PublicRoute path="/login" component={Login} />
          <Route component={Error} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
