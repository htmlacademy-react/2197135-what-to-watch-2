import { Helmet } from 'react-helmet-async';
import FooterLogo from '@/components/footer-logo/footer-logo';
import FilmsCatalog from '@/components/films-catalog/films-catalog';
import { useEffect } from 'react';
import {
  resetGenreAction,
} from '@/store/films-slice/films-slice';
import {
  getFilmsStatusSelector,
  getPromoFilm,
  getPromoFilmStatusSelector,
} from '@/store/films-slice/films-slice-selectors';
import { useAppDispatch, useAppSelector } from '@/hooks';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import {
  checkLoginAction,
  fetchFavoriteFilms,
  fetchFilmsAction,
  fetchPromoFilm,
} from '@/store/api-actions';
import FilmHeroBlock from '@/components/film-heroblock/film-heroblock';
import ErrorPage from '../error-page/error-page';

export default function MainPage(): JSX.Element {
  const filmsStatus = useAppSelector(getFilmsStatusSelector);
  const promoFilm = useAppSelector(getPromoFilm);
  const promoFilmStatus = useAppSelector(getPromoFilmStatusSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGenreAction());
    dispatch(checkLoginAction());
    dispatch(fetchPromoFilm());
    dispatch(fetchFilmsAction());
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  if (filmsStatus.isLoading || promoFilmStatus.isLoading) {
    return <LoadingSpinner />;
  }

  if (!promoFilm) {
    return <ErrorPage />;
  }

  return (
    <>
      <Helmet>
        <title>What to whatch - Main page</title>
      </Helmet>
      <section className="film-card">
        <FilmHeroBlock className={'page-header'} film={promoFilm} />
      </section>
      <div className="page-content">
        <FilmsCatalog />
        <footer className="page-footer">
          <FooterLogo />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
