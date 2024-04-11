import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutAction } from '@/store/api-actions';
import { AppRoute, LoginStatus } from '@/utils/const';

export default function Header() {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <header className="page-header film-card__head">
      <Logo />
      <ul className="user-block">
        {authStatus === LoginStatus.Auth && (
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src="img/avatar.jpg"
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </li>
        )}
        {authStatus === LoginStatus.Auth ? (
          <li className="user-block__item">
            <Link
              className="user-block__link"
              to={AppRoute.Main}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              Sign out
            </Link>
          </li>
        ) : (
          <li className="user-block__item">
            <Link className="user-block__link" to={AppRoute.SignIn}>
              Sign in
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}
