import { VFC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation,
  RouteProps,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '../../stores/slices/auth/authSlice';

import { LOCATION_FROM_PROPS } from './types';

const UnAuthRoute: VFC<RouteProps> = ({ ...props }) => {
  const isAuth = useSelector(selectIsAuth);
  const { state } = useLocation<LOCATION_FROM_PROPS>();

  if (isAuth) {
    if (state) {
      return <Redirect to={state.from} />;
    }
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default UnAuthRoute;
