import { Navigate } from 'react-router-dom';
import { AppRoute, LoginStatus } from '@/utils/const';
import { useAppSelector } from '@/hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps):JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authStatus === LoginStatus.Auth ? children : <Navigate to={AppRoute.SignIn} />
  );
}
