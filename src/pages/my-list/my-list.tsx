import { Helmet } from 'react-helmet-async';
import FilmsList from '@/components/films-list/films-list';
import Header from '@/components/header/header';
import { Film } from '@/types/film';
import Footer from '@/components/footer/footer';

type MyListProps = {
  myFilms: Film[];
};

export default function MyList({myFilms}: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>What to watch.Yours films list</title>
      </Helmet>
      <Header className={'user-page__head'}/>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          <FilmsList films={myFilms} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
