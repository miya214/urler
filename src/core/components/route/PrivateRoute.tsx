import { VFC } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';

import { selectIsAuth } from '../../stores/slices/auth/authSlice';

import { PrivateRouteProps } from './types';

const PrivateRoute: VFC<PrivateRouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);
  console.log(location);

  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
