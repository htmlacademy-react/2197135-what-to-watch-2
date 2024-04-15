import { useAppDispatch, useAppSelector } from '@/hooks';
import Page404 from '@/pages/page-404/page-404';
import { getFilm } from '@/store/films-process/films-process-selectors';
import { resetUserCommentAction } from '@/store/user-slice/user-slice';
import { getAuthStatus } from '@/store/user-slice/user-slice-selectors';
import { AppRoute, LoginStatus } from '@/utils/const';
import { Link, generatePath, useNavigate } from 'react-router-dom';

export function UserControlButtons(): JSX.Element {
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  if (!film) {
    return <Page404 />;
  }

  const { id } = film;

  const handleClick = () => {
    navigate(generatePath(AppRoute.Player, { id }));
  };

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={handleClick}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
        <span className="film-card__count">9</span>
      </button>
      {authStatus === LoginStatus.Auth && (
        <Link
          onClick={() => dispatch(resetUserCommentAction())}
          to={generatePath(AppRoute.AddReview, { id })}
          className="btn film-card__button"
        >
          Add review
        </Link>
      )}
    </div>
  );
}
