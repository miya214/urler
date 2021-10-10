import { VFC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import '../../App.css';

import Navbar from '../blocks/bar/navbar/Navbar';
import Sidebar from '../blocks/bar/sidebar/Sidebar';
import InfoAlert from '../atoms/Alert/InfoAlert';
import MessageWrapper from '../blocks/message/MessageWrapper';
import LoginPage from '../pages/auth/Login';
import SignUpPage from '../pages/auth/SignUp/SignUp';
import SignUpAfterPage from '../pages/auth/SignUp/SignUpAfter';
import UserActivePage from '../pages/auth/SignUp/UserActive';
import ResetPasswordPage from '../pages/auth/ResetPassword/ResetPassword';
import ResetPasswordAfterPage from '../pages/auth/ResetPassword/ResetPasswordAfter';
import ResetPasswordCofirmPage from '../pages/auth/ResetPassword/ResetPasswordConfirm';
// import TopPage from '../pages/top/Top';
// 追加
import Profile from '../pages/profile/Profile';
import MyFoldersPage from '../pages/folder/MyFolders';
import FolderDetail from '../pages/folder/FolderDetail';
import FoldersPage from '../pages/folder/Folders';
import FavoriteFoldersPage from '../pages/folder/FavoriteFolders';

import PrivateRoute from './PrivateRoute';
import UnAuthRoute from './UnAuthRoute';
import ScrollToTop from './ScrollToTop';

import { MainElems } from './RouteElements';

const RouteComponent: VFC = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <ScrollToTop />
    <Sidebar />
    <Navbar />
    <MainElems>
      <Switch>
        <UnAuthRoute exact path="/login" component={LoginPage} />
        <UnAuthRoute exact path="/signup" component={SignUpPage} />
        <UnAuthRoute exact path="/signup/after" component={SignUpAfterPage} />

        <UnAuthRoute
          exact
          path="/password/reset"
          component={ResetPasswordPage}
        />
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
          <MyFoldersPage />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage">
          <Profile />
        </PrivateRoute>
        <PrivateRoute exact path="/folder">
          <FoldersPage />
        </PrivateRoute>
        <PrivateRoute exact path="/folder/favorite">
          <FavoriteFoldersPage />
        </PrivateRoute>
        <PrivateRoute exact path="/folder/:id">
          <FolderDetail />
        </PrivateRoute>
      </Switch>
    </MainElems>
    <InfoAlert />
  </Router>
);

export default RouteComponent;
