import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { selectIsAuth } from '../../stores/slices/auth/authSlice';

import { PrivateRouteProps } from './types';

const PrivateRoute: VFC<PrivateRouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  sessionStorage.setItem('location', location.pathname);
  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
          children
        ) : (
          <Redirect
            from={location.pathname}
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
