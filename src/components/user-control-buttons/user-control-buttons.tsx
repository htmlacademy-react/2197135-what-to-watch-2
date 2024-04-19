import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  fetchFavoriteFilms,
  toggleFilmFavoriteAction,
} from '@/store/api-actions';
import {
  getFavoriteFilms,
  getToggleFavoriteStatusSelector,
} from '@/store/film-favorite-slice/film-favorite-slice-selectors';
import { getAuthStatus } from '@/store/user-slice/user-slice-selectors';
import { AppRoute, FilmStatus, LoginStatus } from '@/utils/const';
import { useEffect } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';

type UserControlButtonsProps = {
  id: string;
  isFavorite: boolean;
};

export function UserControlButtons({
  id,
  isFavorite,
}: UserControlButtonsProps): JSX.Element {
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const toggleFavoriteStatus = useAppSelector(getToggleFavoriteStatusSelector);
  const dispatch = useAppDispatch();

  const isFilmFavorite =
    favoriteFilms.some((film) => film.id === id) || isFavorite;

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

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
    dispatch(fetchFavoriteFilms());
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
        {!isFilmFavorite ? (
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
        ) : (
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
        )}
        <span>My list</span>
        <span className="film-card__count">{favoriteFilms.length}</span>
      </button>
      {authStatus === LoginStatus.Auth && (
        <Link
          to={generatePath(AppRoute.AddReview, { id })}
          className="btn film-card__button"
        >
          Add review
        </Link>
      )}
    </div>
  );
}
