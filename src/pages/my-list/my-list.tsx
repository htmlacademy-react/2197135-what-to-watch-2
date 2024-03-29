import { Helmet } from 'react-helmet-async';

import Logo from '@/components/logo/logo';
import FilmsList from '@/components/films-list/films-list';

import Header from '@/components/header/header';
import { Film } from '@/types/film';

type MyListProps = {
  myFilms: Film[];
};

export default function MyList({myFilms}: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>What to watch.Yours films list</title>
      </Helmet>
      <Header />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          <FilmsList films={myFilms} />
        </div>
      </section>
      <footer className="page-footer">
        <Logo />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
