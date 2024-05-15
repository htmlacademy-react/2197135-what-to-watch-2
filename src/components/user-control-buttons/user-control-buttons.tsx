import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleFilmFavoriteAction } from '@/store/api-actions';
import {
  getFavoriteFilms,
  getToggleFavoriteStatusSelector,
} from '@/store/film-favorite-slice/film-favorite-slice-selectors';
import { getAuthStatus } from '@/store/user-slice/user-slice-selectors';
import { AppRoute, FilmStatus, LoginStatus } from '@/utils/const';
import { Link, generatePath, useNavigate } from 'react-router-dom';

type UserControlButtonsProps = {
  id: string;
  isPromo?: boolean;
};

export function UserControlButtons({
  id,
  isPromo,
}: UserControlButtonsProps): JSX.Element {
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const toggleFavoriteStatus = useAppSelector(getToggleFavoriteStatusSelector);
  const dispatch = useAppDispatch();

  const isFilmFavorite = favoriteFilms.map((film) => film.id).includes(id);

  const handlePlayerButton = () => {
    navigate(generatePath(AppRoute.Player, { id }));
  };

  const handleMyListButton = () => {
    dispatch(
      toggleFilmFavoriteAction({
        id,
        favoriteStatus: isFilmFavorite
          ? FilmStatus.NotFavforite
          : FilmStatus.Favorite,
      })
    );
  };

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={handlePlayerButton}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button
        onClick={handleMyListButton}
        disabled={toggleFavoriteStatus.isLoading}
        className="btn btn--list film-card__button"
        type="button"
      >
        {isFilmFavorite ? (
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
        ) : (
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
        )}
        <span>My list</span>
        <span className="film-card__count">{favoriteFilms.length}</span>
      </button>
      {authStatus === LoginStatus.Auth && !isPromo ? (
        <Link
          to={generatePath(AppRoute.AddReview, { id })}
          className="btn film-card__button"
        >
          Add review
        </Link>
      ) : null}
    </div>
  );
}
