import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Logo from '@/components/logo/logo';
import FilmHeroblock from '@/components/film-heroblock/film-heroblock';
import { Film as FilmType } from '@/types/film';
import Page404 from '../page-404/page-404';
import FilmOverview from '@/components/film-overview/film-overview';
import FilmsList from '@/components/films-list/films-list';

type FilmProps = {
  films: FilmType[];
  myFilms: FilmType[];
};

type Params = {
  id: string;
};

export default function Film({ films, myFilms }: FilmProps): JSX.Element {
  const { id } = useParams<Params>();
  const film = films.find((item) => item.id === id);

  if (!film) {
    return <Page404 />;
  }

  return (
    <>
      <section key={id} className="film-card film-card--full">
        <Helmet>
          <title>What to whatch. Whatch your film</title>
        </Helmet>
        <FilmHeroblock
          filmImage={film.previewImage}
          filmName={film.name}
          filmGenre={film.genre}
          filmYear={film.year}
          id={film.id}
        />
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.previewImage}
                alt={film.name}
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">
                      Details
                    </a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">
                      Reviews
                    </a>
                  </li>
                </ul>
              </nav>
              <FilmOverview
                filmRating={film.rating}
                filmActors={film.actors}
                filmDescription={film.description}
                filmDirector={film.director}
                filmRatingCount={film.ratingCount}
                filmRatingLevel={film.ratingLevel}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <FilmsList films={myFilms} />
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
