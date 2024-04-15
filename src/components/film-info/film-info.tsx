import { FilmDetails as FilmDetailsType } from '@/types/film-details';
import { FilmOverview as FilmOverviewType } from '@/types/film-overview';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import UserReviews from '../user-reviews/user-reviews';
import { ActiveTabs } from '@/utils/const';
import { ChosenFilm } from '@/types/chosenFilm';
import { useAppSelector } from '@/hooks';
import { getFilmReviews } from '@/store/films-process/films-process-selectors';

type FilmInfoProps = {
  film: ChosenFilm;
  activeTab: string;
};

export default function FilmInfo({
  film,
  activeTab,
}: FilmInfoProps): JSX.Element {
  const reviews = useAppSelector(getFilmReviews);

  const filmDetails: FilmDetailsType = {
    director: film.director,
    genre: film.genre,
    year: film.released,
    actors: film.starring,
    duration: film.runTime,
  };

  const filmOverview: FilmOverviewType = {
    rating: film.rating,
    ratingLevel: 'good',
    ratingCount: film.scoreCount,
    description: film.description,
    actors: film.starring,
    director: film.director,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case ActiveTabs.Overview:
        return <FilmOverview filmOverview={filmOverview} />;
      case ActiveTabs.Details:
        return <FilmDetails filmDetails={filmDetails} />;
      case ActiveTabs.Reviews:
        return <UserReviews reviews={reviews} />;
      default:
        return <FilmOverview filmOverview={filmOverview} />;
    }
  };

  return <>{renderTabContent()}</>;
}
