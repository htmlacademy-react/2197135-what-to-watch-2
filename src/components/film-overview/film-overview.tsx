import { FilmOverview as FilmOverviewType } from '@/types/film-overview';

type FilmOverviewProps = {
  filmOverview: FilmOverviewType;
};

export default function FilmOverview({
  filmOverview,
}: FilmOverviewProps): JSX.Element {
  let filmRatingLevel: string;

  switch (true) {
    case filmOverview.rating >= 0 && filmOverview.rating < 3:
      filmRatingLevel = 'Bad';
      break;
    case filmOverview.rating >= 3 && filmOverview.rating < 5:
      filmRatingLevel = 'Normal';
      break;
    case filmOverview.rating >= 5 && filmOverview.rating < 8:
      filmRatingLevel = 'Good';
      break;
    case filmOverview.rating >= 8 && filmOverview.rating < 10:
      filmRatingLevel = 'Very good';
      break;
    case filmOverview.rating === 10:
      filmRatingLevel = 'Awesome';
      break;
    default:
      filmRatingLevel = 'Unknown';
  }

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{filmOverview.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{filmRatingLevel}</span>
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
