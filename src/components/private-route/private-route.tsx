import { Navigate } from 'react-router-dom';
import { AppRoute, LoginStatus } from '../../utils/const';

type PrivateRouteProps = {
  loginStatus: LoginStatus;
  children: JSX.Element;
}

export default function PrivateRoute({loginStatus, children}: PrivateRouteProps):JSX.Element {
  return (
    loginStatus === LoginStatus.Auth ? children : <Navigate to={AppRoute.SignIn} />
  );
}
