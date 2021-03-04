/* eslint-disable @typescript-eslint/no-empty-interface */
import { useAuthContext } from '@ctb/auth-context';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import Reservation from './pages/reservation/reservation';
import PrivateRoute from './components/private-route';
import PublicRoute from './components/public-route';

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  // const [isLoggedIn, setIsloggedIn] = useState(false);
  // const { currentUser } = useAuthContext();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <PublicRoute component={Login} path="/login" />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/reservation" component={Reservation} />
        <PrivateRoute path="/users" component={Reservation} />
        <PrivateRoute path="/companies" component={Reservation} />
        <PrivateRoute path="/settings" component={Reservation} />
        <PrivateRoute path="/support" component={Reservation} />
        <PrivateRoute path="/faq" component={Reservation} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
