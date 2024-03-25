type FilmOverviewProps = {
  filmRating: number;
  filmRatingCount: number;
  filmRatingLevel: string;
  filmDescription: string;
  filmDirector: string;
  filmActors: string[];
};

export default function FilmOverview({
  filmRating,
  filmRatingCount,
  filmRatingLevel,
  filmDescription,
  filmDirector,
  filmActors,
}: FilmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{filmRating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{filmRatingLevel}</span>
          <span className="film-rating__count">{filmRatingCount}</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{filmDescription}</p>
        <p className="film-card__director">
          <strong>{filmDirector}</strong>
        </p>
        <p className="film-card__starring">
          <strong>Starring: {filmActors}</strong>
        </p>
      </div>
    </>
  );
}
