import { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';

export interface LOCATION_FROM_PROPS {
  from: string;
}

export interface PrivateRouteProps extends RouteProps {
  children: ReactNode;
}
