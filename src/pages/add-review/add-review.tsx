import { Helmet } from 'react-helmet-async';
import FilmHeroBlock from '@/components/film-heroblock/film-heroblock';
import Page404 from '../page-404/page-404';
import AddReviewForm from '@/components/add-review-form/add-review-form';
import { useAppSelector } from '@/hooks';
import { getFilm } from '@/store/films-process/films-process-selectors';
import { getUserCommentStatus } from '@/store/user-slice/user-slice-selectors';
import { FetchStatus } from '@/utils/const';
import FailedUserComment from '@/components/failed-user-comment/failed-user-comment';

export default function AddReview(): JSX.Element {
  const film = useAppSelector(getFilm);
  const userCommentStatus = useAppSelector(getUserCommentStatus);

  if (!film) {
    return <Page404 />;
  }

  return (
    <section
      className="film-card film-card--full"
      style={{ backgroundColor: film.backgroundColor }}
    >
      <Helmet>
        <title>What to whatch.Add your review</title>
      </Helmet>
      <FilmHeroBlock
        backgroundPoster={film.backgroundImage}
        name={film.name}
        genre={film.genre}
        year={film.released}
      />
      {userCommentStatus !== FetchStatus.Failed ? (
        <AddReviewForm />
      ) : (
        <FailedUserComment id={film.id} />
      )}
    </section>
  );
}
