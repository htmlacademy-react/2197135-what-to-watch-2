import { Film } from '@/types/film';
import { FilmDetails as FilmDetailsType } from '@/types/film-details';
import { FilmOverview as FilmOverviewType } from '@/types/film-overview';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import UserReviews from '../user-reviews/user-reviews';

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

  return (
    <>
      {activeTab === 'Overview' && <FilmOverview filmOverview={filmOverview} />}
      {activeTab === 'Details' && <FilmDetails filmDetails={filmDetails} />}
      {activeTab === 'Reviews' && <UserReviews reviews={reviews} />}
    </>
  );
}
