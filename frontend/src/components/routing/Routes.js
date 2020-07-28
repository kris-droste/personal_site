import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Users from '../users/Users';
import Upload from '../users/Upload';
import Paragraphs from '../paragraphs/Paragraphs';
import Paragraph from '../paragraphs/Paragraph';
import ParagraphForm from '../paragraphs/ParagraphForm';
import UpdateParagraphForm from '../paragraphs/UpdateParagraphForm';
import Works from '../works/Works';
import PublicWorks from '../works/PublicWorks';
import Work from '../works/Work';
import WorkForm from '../works/WorkForm';
import UpdateWorkForm from '../works/UpdateWorkForm';
import Messages from '../messages/Messages';
import Message from '../messages/Message';
import MessageForm from '../messages/MessageForm';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/create-message" component={MessageForm} />
        <PrivateRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/upload" component={Upload} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/paragraphs" component={Paragraphs} />
        <PrivateRoute exact path="/paragraphs/:id" component={Paragraph} />
        <PrivateRoute exact path="/create-paragraph" component={ParagraphForm} />
        <PrivateRoute exact path="/paragraphs/update/:id" component={UpdateParagraphForm} />
        <PrivateRoute exact path="/paragraphs/paragraphs/update/:id" component={UpdateParagraphForm} />
        <PrivateRoute exact path="/works" component={Works} />
        <Route exact path="/publicWorks" component={PublicWorks} />
        <PrivateRoute exact path="/works/:id" component={Work} />
        <PrivateRoute exact path="/create-work" component={WorkForm} />
        <PrivateRoute exact path="/works/update/:id" component={UpdateWorkForm} />
        <PrivateRoute exact path="/works/works/update/:id" component={UpdateWorkForm} />
        <PrivateRoute exact path="/messages" component={Messages} />
        <PrivateRoute exact path="/messages/:id" component={Message} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
