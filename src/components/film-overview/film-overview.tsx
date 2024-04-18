import { FilmOverview as FilmOverviewType } from '@/types/film-overview';

type FilmOverviewProps = {
  filmOverview: FilmOverviewType;
};

export default function FilmOverview({
  filmOverview,
}: FilmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{filmOverview.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{filmOverview.ratingLevel}</span>
          <span className="film-rating__count">
            {filmOverview.scoreCount} ratings{' '}
          </span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{filmOverview.description}</p>
        <p className="film-card__director">
          <strong>Director: {filmOverview.director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>Starring: {filmOverview.starring.join(', ')}</strong>
        </p>
      </div>
    </>
  );
}
