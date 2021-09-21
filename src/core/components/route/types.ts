import { ReactNode } from 'react';
import { BrowserRouter as Router, RouteProps } from 'react-router-dom';

export interface LOCATION_FROM_PROPS {
  from: string;
}

export interface PrivateRouteProps extends RouteProps {
  children: ReactNode;
}
