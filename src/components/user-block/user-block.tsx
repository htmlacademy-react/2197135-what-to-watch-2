import { useAppDispatch, useAppSelector } from '@/hooks';
import { LoginStatus } from '@/utils/const';
import { AppRoute } from '@/utils/const';
import { logoutAction } from '@/store/api-actions';
import { Link } from 'react-router-dom';
import { getAuthStatus } from '@/store/user-slice/user-slice-selectors';

export default function UserBlock() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  return (
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
  );
}
