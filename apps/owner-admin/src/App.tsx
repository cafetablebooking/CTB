/* eslint-disable @typescript-eslint/no-empty-interface */

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import Reservation from './pages/reservation/reservation';
import PrivateRoute from './components/private-route';
import PublicRoute from './components/public-route';
import Users from './pages/users/users';
import PendingCompanies from './pages/pendingCompanies/pendingCompanies';
import CreateCompanyUser from './pages/create-company-user/create-company-user';
import CompanyUser from './pages/company-user/company-user';
import ComingSoon from './pages/coming-soon/coming-soon';

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <PublicRoute component={Login} path="/login" />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/reservation" component={Reservation} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/companies" component={CompanyUser} />
        <PrivateRoute path="/pendingCompanies" component={PendingCompanies} />
        <PrivateRoute path="/settings" component={ComingSoon} />
        <PrivateRoute path="/support" component={ComingSoon} />
        <PrivateRoute path="/faq" component={ComingSoon} />
        <PrivateRoute
          path="/create-company-user"
          component={CreateCompanyUser}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
