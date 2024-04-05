import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { chooseGenreAction, resetGenreAction } from '@/store/action';
import { genres } from '@/utils/const';

export default function FilmsCatalog() {
  const genre = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);
  const dispatch = useAppDispatch();

  const handleSortClick = (value: string) => {
    if (value === genres[0]) {
      dispatch(resetGenreAction());
    } else {
      dispatch(chooseGenreAction({genre: value}));
    }
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList activeGenre={genre} onSortClick={handleSortClick} />
      <FilmsList films={films} />
      <div className="catalog__more">
        <button className="catalog__button" type="button">
          Show more
        </button>
      </div>
    </section>
  );
}
