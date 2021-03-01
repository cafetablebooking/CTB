/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Reservation from './pages/reservation/reservation';

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/users" component={Reservation} />
        <Route path="/companies" component={Reservation} />
        <Route path="/settings" component={Reservation} />
        <Route path="/support" component={Reservation} />
        <Route path="/faq" component={Reservation} />
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
