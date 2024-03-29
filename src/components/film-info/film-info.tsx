import { FilmInfo as FilmInfoType } from '@/types/film-info';
import FilmNavigation from '../film-navigation/film-navigation';
import FilmOverview from '../film-overview/film-overview';

type FilmInfoProps = {
  filmInfo: FilmInfoType;
};

export default function FilmInfo({ filmInfo }: FilmInfoProps): JSX.Element {
  return (
    <div className="film-card__info">
      <div className="film-card__poster film-card__poster--big">
        <img src={filmInfo.previewImage} alt={filmInfo.name} width={218} height={327} />
      </div>
      <div className="film-card__desc">
        <FilmNavigation />
        <FilmOverview
          filmRating={filmInfo.rating}
          filmActors={filmInfo.actors}
          filmDescription={filmInfo.description}
          filmDirector={filmInfo.director}
          filmRatingCount={filmInfo.ratingCount}
          filmRatingLevel={filmInfo.ratingLevel}
        />
      </div>
    </div>
  );
}
