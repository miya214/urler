import { VFC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '../../stores/slices/auth/authSlice';

const UnAuthRoute: VFC<RouteProps> = ({ ...props }) => {
  const isAuth = useSelector(selectIsAuth);
  const location = sessionStorage.getItem('location');
  if (isAuth) {
    if (location) {
      return <Redirect to={location} />;
    }
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default UnAuthRoute;
