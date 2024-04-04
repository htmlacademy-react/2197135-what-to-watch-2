import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { chooseGenreAction, resetGenreAction} from '@/store/action';
import { Genres } from '@/utils/const';
import { useState } from 'react';


export default function FilmsCatalogue() {
  const genre = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);
  const dispatch = useAppDispatch();

  const [activeGenre, setActiveGenre] = useState(genre);

  const handleSortClick = (value: Genres) => {
    setActiveGenre(value);
    if(value === Genres.AllGenres) {
      return dispatch(resetGenreAction());
    }
    dispatch(chooseGenreAction({genre: value}));
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList activeGenre={activeGenre} handleSortClick={handleSortClick} />
      <FilmsList films={films} />
      <div className="catalog__more">
        <button className="catalog__button" type="button">
          Show more
        </button>
      </div>
    </section>
  );
}
