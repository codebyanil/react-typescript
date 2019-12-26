import React from 'react';
import { BrowserRouter as AppRouter, Route } from 'react-router-dom';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import Dashboard from '../views/Dashboard';
import Logout from '../views/Logout';
import Contacts from '../views/Contact';
import ViewContact from '../views/ContactView/ViewContact';
import Storys from '../views/Story/Storys';
import ViewStory from '../views/StoryView/ViewStory';
import Profile from '../views/Setting/Profile';


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
        path="/register"
        component={SignUp}
      />
      <Route
        exact
        path="/logout"
        component={Logout}
      />
      <Route
        exact
        path="/"
        component={Dashboard}
      />

      <Route
        exact
        path="/contact"
        component={Contacts}
      />
      <Route
        exact
        path="/data/:id"
        component={ViewContact}
      />
      <Route
        exact
        path="/story"
        component={Storys}
      />
      <Route
        exact
        path="/stories/:id"
        component={ViewStory}
      />
      <Route
        exact
        path="/profile"
        component={Profile}
      />
    </AppRouter>
  );
};

export default Router;
