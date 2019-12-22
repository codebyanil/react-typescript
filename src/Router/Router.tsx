import React from 'react';
import { BrowserRouter as AppRouter, Route } from 'react-router-dom';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import Dashboard from '../views/Dashboard';

const Router = () => {
  return (
    <AppRouter>
      <Route
        exact
        path="/login"
        component={Login}
      />
      <Route
        exact
        path="/signup"
        component={SignUp}
      />
      <Route
        exact
        path="/"
        component={Dashboard}
      />
    </AppRouter>
  );
};

export default Router;
