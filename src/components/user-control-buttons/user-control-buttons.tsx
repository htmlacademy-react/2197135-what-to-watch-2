import { AppRoute, LoginStatus } from '@/utils/const';
import { Link, generatePath, useNavigate } from 'react-router-dom';

type UserControlButtonsProps = {
  id: string;
};

export function UserControlButtons({
  id,
}: UserControlButtonsProps): JSX.Element {
  const navigate = useNavigate();

  function onPlayerHandle() {
    navigate(generatePath(AppRoute.Player, { id }));
  }

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={onPlayerHandle}
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
      {LoginStatus.Auth && (
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
