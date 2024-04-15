import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import FooterLogo from '@/components/footer-logo/footer-logo';
import FilmsCatalog from '@/components/films-catalog/films-catalog';
import { useEffect } from 'react';
import UserBlock from '@/components/user-block/user-block';
import { resetGenreAction } from '@/store/films-process/films-process-slice';
import { getAuthStatus } from '@/store/user-slice/user-slice-selectors';
import { getFilmsStatus } from '@/store/films-process/films-process-selectors';
import { useAppDispatch, useAppSelector } from '@/hooks';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';
import { checkLoginAction, fetchFilmsAction } from '@/store/api-actions';
import { redirectToRouteAction } from '@/store/action';
import { AppRoute } from '@/utils/const';

export default function MainPage(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const filmsStatus = useAppSelector(getFilmsStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGenreAction());
    dispatch(fetchFilmsAction());
    dispatch(checkLoginAction());
  }, [dispatch]);

  if (!authStatus || filmsStatus.isLoading) {
    return <LoadingSpinner />;
  }

  if (filmsStatus.isError) {
    dispatch(redirectToRouteAction(AppRoute.Error));
  }

  return (
    <>
      <Helmet>
        <title>What to whatch. Main page</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header className={'film-card__head'}>
          <UserBlock />
        </Header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>
              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
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
