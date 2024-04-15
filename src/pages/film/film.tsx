import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FilmHeroblock from '@/components/film-heroblock/film-heroblock';
import FilmDescription from '@/components/film-description/film-description';
import SortedFilms from '@/components/sorted-films/sorted-films';
import { useAppSelector } from '@/hooks';
import Footer from '@/components/footer/footer';
import {
  getFilm,
  getFilmStatus,
  getFilms,
} from '@/store/films-process/films-process-selectors';
import Page404 from '../page-404/page-404';
import { FetchStatus } from '@/utils/const';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

export default function Film(): JSX.Element {
  const { id } = useParams<{ id: string | undefined }>();

  const films = useAppSelector(getFilms);
  const filmStatus = useAppSelector(getFilmStatus);

  const film = useAppSelector(getFilm);

  if (filmStatus === FetchStatus.Pending) {
    return <LoadingSpinner />;
  }

  if (!film) {
    return <Page404 />;
  }

  const sortedFilms = films.filter((currentFilm) => currentFilm.id !== id);

  return (
    <>
      <section
        className="film-card film-card--full"
        style={{ backgroundColor: film.backgroundColor }}
      >
        <Helmet>
          <title>What to whatch. Whatch your film</title>
        </Helmet>
        <FilmHeroblock
          backgroundPoster={film.backgroundImage}
          name={film.name}
          genre={film.genre}
          year={film.released}
        />
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
        <SortedFilms films={sortedFilms} genre={film.genre} />
        <Footer />
      </div>
    </>
  );
}
