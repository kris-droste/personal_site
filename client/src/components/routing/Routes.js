import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import MessageForm from '../messages/MessageForm';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Poems from '../poems/Poems';
import Poem from '../poem/Poem';
import Messages from '../messages/Messages';
import Message from '../message/Message';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/create-message" component={MessageForm} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/poems" component={Poems} />
        <Route exact path="/poems/:id" component={Poem} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/messages" component={Messages} />
        <PrivateRoute exact path="/messages/:id" component={Message} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
