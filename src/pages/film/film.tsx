import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Logo from '@/components/logo/logo';
import FilmHeroblock from '@/components/film-heroblock/film-heroblock';
import {Film as FilmType } from '@/types/film';
import Page404 from '../page-404/page-404';
import FilmDescription from '@/components/film-description/film-description';
import SortedFilms from '@/components/sorted-films/sorted.films';


type FilmProps = {
  films: FilmType[];
  myFilms: FilmType[];
};

type Params = {
  id: string;
};

export default function Film({ films }: FilmProps): JSX.Element {
  const { id } = useParams<Params>();

  if (!id) {
    return <Page404 />;
  }
  const film = films.find((item) => item.id === id);

  if (!film) {
    return <Page404 />;

  }

  const {previewImage, genre, year, name,} = film;

  const sortedFilms = films.filter(film => film.id !== id)


  return (
    <>
      <section className="film-card film-card--full">
        <Helmet>
          <title>What to whatch. Whatch your film</title>
        </Helmet>
        <FilmHeroblock
          image={previewImage}
          name={name}
          genre={genre}
          year={year}
          id={id}
        />
        <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <img src={previewImage} alt={name} width={218} height={327} />
        </div>
          <FilmDescription film={film} />
        </div>
        </div>
      </section>
      <div className="page-content">
        <SortedFilms films={sortedFilms} genre={genre} />
        <footer className="page-footer">
          <Logo />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

