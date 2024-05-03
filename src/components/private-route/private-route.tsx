import { Navigate } from 'react-router-dom';
import { AppRoute, LoginStatus } from '@/utils/const';
import { useAppSelector } from '@/hooks';
import { getAuthStatus } from '@/store/user-slice/user-slice-selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return authStatus !== LoginStatus.NoAuth ? (
    children
  ) : (
    <Navigate to={AppRoute.SignIn} />
  );
}
