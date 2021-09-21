import { VFC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import logo from '../../../logo.svg';
import '../../App.css';

import Navbar from '../blocks/navbar/Navbar';
import Message from '../blocks/message/Message';

import LoginPage from '../pages/auth/Login';
import SignUpPage from '../pages/auth/SignUp/SignUp';
import SignUpAfterPage from '../pages/auth/SignUp/SignUpAfter';
import UserActivePage from '../pages/auth/SignUp/UserActive';
import ResetPasswordPage from '../pages/auth/ResetPassword/ResetPassword';
import ResetPasswordAfterPage from '../pages/auth/ResetPassword/ResetPasswordAfter';
import ResetPasswordCofirmPage from '../pages/auth/ResetPassword/ResetPasswordConfirm';
import TopPage from '../pages/top/Top';
import Profile from '../pages/profile/Profile';
import FolderDetail from '../pages/folder/FolderDetail';
import FoldersPage from '../pages/folder/Folders';

import PrivateRoute from './PrivateRoute';
import UnAuthRoute from './UnAuthRoute';

const RouteComponent: VFC = () => (
  <Router>
    <Navbar />
    <Message />
    <img src={logo} className="App-logo" alt="logo" width="100" height="100" />
    <Switch>
      <UnAuthRoute exact path="/login" component={LoginPage} />
      <UnAuthRoute exact path="/signup" component={SignUpPage} />
      <UnAuthRoute exact path="/signup/after" component={SignUpAfterPage} />

      <UnAuthRoute exact path="/password/reset" component={ResetPasswordPage} />
      <UnAuthRoute
        exact
        path="/activate/:uid/:token"
        component={UserActivePage}
      />
      <UnAuthRoute
        exact
        path="/password/reset/confirm/:uid/:token"
        component={ResetPasswordCofirmPage}
      />
      <UnAuthRoute
        exact
        path="/password/reset/after"
        component={ResetPasswordAfterPage}
      />
      <PrivateRoute exact path="/">
        <TopPage />
      </PrivateRoute>
      <PrivateRoute exact path="/mypage">
        <Profile />
      </PrivateRoute>
      <PrivateRoute exact path="/folder">
        <FoldersPage />
      </PrivateRoute>
      <PrivateRoute exact path="/folder/:id">
        <FolderDetail />
      </PrivateRoute>
    </Switch>
  </Router>
);

export default RouteComponent;
