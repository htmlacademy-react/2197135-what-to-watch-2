import { Film } from '@/types/film';
import { FilmDetails as FilmDetailsType } from '@/types/film-details';
import { FilmOverview as FilmOverviewType } from '@/types/film-overview';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import UserReviews from '../user-reviews/user-reviews';
import { ActiveTabs } from '@/utils/const';

type FilmInfoProps = {
  film: Film;
  activeTab: string;
};

export default function FilmInfo({
  film,
  activeTab,
}: FilmInfoProps): JSX.Element {
  const {
    director,
    genre,
    year,
    reviews,
    actors,
    duration,
    description,
    ratingLevel,
    rating,
    ratingCount,
  } = film;

  const filmDetails: FilmDetailsType = {
    director,
    genre,
    year,
    actors,
    duration,
  };

  const filmOverview: FilmOverviewType = {
    rating,
    ratingLevel,
    ratingCount,
    description,
    actors,
    director,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case ActiveTabs.Overview:
        return <FilmOverview filmOverview={filmOverview} />;
      case ActiveTabs.Details:
        return <FilmDetails filmDetails={filmDetails} />;
      case ActiveTabs.Reviews:
        return <UserReviews reviews={reviews} />
      default:
        return <FilmOverview filmOverview={filmOverview} />;
    }
  }

  return (
    <>
      {renderTabContent()}
    </>
  );
}
