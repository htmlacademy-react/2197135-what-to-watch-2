import { FilmDetails as FilmDetailsType } from '@/types/film-details';
import { FilmOverview as FilmOverviewType } from '@/types/film-overview';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import UserReviews from '../user-reviews/user-reviews';
import { ActiveTabs } from '@/utils/const';
import { useAppSelector } from '@/hooks';
import { Film } from '@/types/film';
import { getFilmReviews } from '@/store/reviews-slice/film-review-slice-selectors';

type FilmInfoProps = {
  film: Film;
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
    released: film.released,
    starring: film.starring,
    runTime: film.runTime,
  };

  const filmOverview: FilmOverviewType = {
    rating: film.rating,
    ratingLevel: 'good',
    scoreCount: film.scoreCount,
    description: film.description,
    starring: film.starring,
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
