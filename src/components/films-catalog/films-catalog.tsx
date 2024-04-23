import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import { useAppDispatch, useAppSelector } from '@/hooks';
import ShowMoreButton from '../show-more-button/show-more-button';
import { ALL_GENRES } from '@/utils/const';
import { useEffect } from 'react';
import {
  getActiveGenre,
  getFilms,
  getFilmsShown,
} from '@/store/films-slice/films-slice-selectors';
import {
  chooseGenreAction,
  resetShownFilmsAction,
} from '@/store/films-slice/films-slice';

export default function FilmsCatalog(): JSX.Element {
  const activeGenre = useAppSelector(getActiveGenre);
  const films = useAppSelector(getFilms);
  const filmsShown = useAppSelector(getFilmsShown);

  const dispatch = useAppDispatch();

  const allGenres = [ALL_GENRES, ...new Set(films.map((film) => film.genre))];

  const filteredFilms =
    activeGenre === ALL_GENRES
      ? films
      : films.filter((film) => film.genre === activeGenre);

  const filmsToShow = filteredFilms.slice(0, filmsShown);

  const hasNextFilms = filteredFilms.length > filmsToShow.length;

  useEffect(() => {
    dispatch(resetShownFilmsAction());
  }, [dispatch, activeGenre]);

  const handleSortClick = (value: string) => {
    dispatch(chooseGenreAction(value));
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList
        activeGenre={activeGenre}
        genres={allGenres}
        onSortClick={handleSortClick}
      />
      <FilmsList films={filmsToShow} />
      {hasNextFilms && <ShowMoreButton />}
    </section>
  );
}
