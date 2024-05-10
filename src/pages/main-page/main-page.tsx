import { Helmet } from 'react-helmet-async';
import FilmsCatalog from '@/components/films-catalog/films-catalog';
import { useEffect } from 'react';
import { resetGenreAction } from '@/store/films-slice/films-slice';
import {
  getFilmsStatusSelector,
  getPromoFilm,
  getPromoFilmStatusSelector,
} from '@/store/films-slice/films-slice-selectors';
import { useAppDispatch, useAppSelector } from '@/hooks';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { fetchFilmsAction, fetchPromoFilm } from '@/store/api-actions';
import ErrorPage from '../error-page/error-page';
import PromoHeroBlock from '@/components/promo-heroblock/promo-heroblock';
import Footer from '@/components/footer/footer';

export default function MainPage(): JSX.Element {
  const filmsStatus = useAppSelector(getFilmsStatusSelector);
  const promoFilm = useAppSelector(getPromoFilm);
  const promoFilmStatus = useAppSelector(getPromoFilmStatusSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGenreAction());
    dispatch(fetchPromoFilm());
    dispatch(fetchFilmsAction());
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
        <PromoHeroBlock className={'page-header'} film={promoFilm} />
      </section>
      <div className="page-content">
        <FilmsCatalog />
        <Footer />
      </div>
    </>
  );
}
