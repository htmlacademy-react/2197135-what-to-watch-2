import { Helmet } from 'react-helmet-async';
import Page404 from '../page-404/page-404';
import AddReviewForm from '@/components/add-review-form/add-review-form';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  getFilm,
  getFilmStatusSelector,
} from '@/store/films-slice/films-slice-selectors';
import FilmCardHeader from '@/components/film-card-header/film-card-header';
import { useParams } from 'react-router-dom';
import { fetchChosenFilm } from '@/store/api-actions';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

export default function AddReview(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const filmStatus = useAppSelector(getFilmStatusSelector);

  useEffect(() => {
    if (id) {
      dispatch(fetchChosenFilm(id));
    }
  }, [id, dispatch]);

  if (filmStatus.isLoading) {
    return <LoadingSpinner />;
  }

  if (!film) {
    return <Page404 />;
  }

  return (
    <section
      className="film-card film-card--full"
      style={{ backgroundColor: film.backgroundColor }}
    >
      <Helmet>
        <title>What to whatch -Add your review</title>
      </Helmet>
      <FilmCardHeader film={film} />
      <AddReviewForm id={film.id} />
    </section>
  );
}
