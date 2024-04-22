import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { useAppSelector } from '@/hooks';
import FilmsList from '@/components/films-list/films-list';
import {
  getFavoriteFilms,
  getFavoriteFilmsStatusSelectors,
} from '@/store/film-favorite-slice/film-favorite-slice-selectors';
import ErrorPage from '../error-page/error-page';
import UserBlock from '@/components/user-block/user-block';

export default function MyList() {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const favoriteFilmsStatus = useAppSelector(getFavoriteFilmsStatusSelectors);

  if (favoriteFilmsStatus.isError && !favoriteFilms) {
    return <ErrorPage />;
  }

  return (
    <div className="user-page">
      <Helmet>
        <title>What to watch.Yours films list</title>
      </Helmet>
      <Header className={'page-header user-page__head'}>
        <h1 className="page-title user-page__title">
          My list
          <span className="user-page__film-count">{favoriteFilms.length}</span>
        </h1>
        <UserBlock />
      </Header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list"></div>
        <FilmsList films={favoriteFilms} />
      </section>
      <Footer />
    </div>
  );
}
