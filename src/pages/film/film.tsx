import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Logo from '@/components/logo/logo';
import FilmHeroblock from '@/components/film-heroblock/film-heroblock';
import {Film as FilmType } from '@/types/film';
import { FilmDetails } from '@/types/film-details';
import { FilmInfo as FilmInfoType } from '@/types/film-info';
import FilmInfo from '@/components/film-info/film-info';
import Page404 from '../page-404/page-404';
import FilmsList from '@/components/films-list/films-list';
import FilmDetailsComponent from '@/components/film-details/film-details';
import UserReviews from '@/components/user-reviews/user-reviews';


type FilmProps = {
  films: FilmType[];
  myFilms: FilmType[];
};

type Params = {
  id: string;
};

export default function Film({ films, myFilms }: FilmProps): JSX.Element {
  const { id } = useParams<Params>();

  if (!id) {
    return <Page404 />;
  }
  const film = films.find((item) => item.id === id);

  if (!film) {
    return <Page404 />;

  }

  const {director, previewImage, genre, year, name, reviews, actors, duration, description, ratingLevel, rating, ratingCount} = film;

  const filmDetails: FilmDetails = {director, genre, year, actors, duration};

  const filmInfo: FilmInfoType = {name, id, previewImage, rating, ratingLevel, ratingCount, description, actors, director};

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
          <FilmInfo filmInfo={filmInfo} />
          <FilmDetailsComponent filmDetails={filmDetails} />
          <UserReviews reviews={reviews} />
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

