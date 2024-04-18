import { Helmet } from 'react-helmet-async';
import FilmHeroblock from '@/components/film-heroblock/film-heroblock';
import FilmDescription from '@/components/film-description/film-description';
import { useAppSelector } from '@/hooks';
import Footer from '@/components/footer/footer';
import {
  getFilm,
  getFilmStatusSelector,
  getSimilarFilms,
  getSimilarFilmsStatusSelector,
} from '@/store/films-slice/films-slice-selectors';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { useFetchFilm } from '@/hooks/use-fetch-film';
import { useParams } from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import FilmsList from '@/components/films-list/films-list';
import Spinner from '@/components/spinner/spinner';

export default function Film(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  useFetchFilm(id);
  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const filmStatus = useAppSelector(getFilmStatusSelector);
  const similarFilmsStatus = useAppSelector(getSimilarFilmsStatusSelector);

  if (filmStatus.isLoading) {
    return <LoadingSpinner />;
  }

  if (!film) {
    return <ErrorPage />;
  }

  return (
    <>
      <section
        className="film-card film-card--full"
        style={{ backgroundColor: film.backgroundColor }}
      >
        <Helmet>
          <title>What to whatch - Whatch your film</title>
        </Helmet>
        <div className="film-card__hero">
          <FilmHeroblock
            className={'page-header film-card__head'}
            film={film}
          />
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={film.name}
                width={218}
                height={327}
              />
            </div>
            <FilmDescription film={film} />
          </div>
        </div>
      </section>
      <div className="page-content">
        {similarFilmsStatus.isError && <p>Cannot load similar films</p>}
        {similarFilmsStatus.isLoading && <Spinner />}
        {similarFilmsStatus.isSuccess && (
          <FilmsList films={similarFilms} shorted />
        )}
        <Footer />
      </div>
    </>
  );
}
