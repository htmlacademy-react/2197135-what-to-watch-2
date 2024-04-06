import { Helmet } from 'react-helmet-async';
import Header from '@/components/header/header';
import FooterLogo from '@/components/footer-logo/footer-logo';
import FilmsCatalog from '@/components/films-catalog/films-catalog';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetGenreAction } from '@/store/action';
import { UserControlButtons } from '@/components/user-control-buttons/user-control-buttons';
import { useAppSelector } from '@/hooks';

export default function MainPage(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(resetGenreAction());
    },
    [dispatch]
  );

  const filmId = useAppSelector((state) => state.films[0].id);

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
        <Header />
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
              <UserControlButtons id={filmId} />
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
