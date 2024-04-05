import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { chooseGenreAction, resetGenreAction } from '@/store/action';
import { genres } from '@/utils/const';
import ShowMoreButton from '../show-more-button/show-more-button';

export default function FilmsCatalog() {
  const genre = useAppSelector((state) => state.genre);
  const films = useAppSelector((state) => state.films);
  const dispatch = useAppDispatch();

  const handleSortClick = (value: string) => {
    if (value === genres[0]) {
      dispatch(resetGenreAction());
    } else {
      dispatch(chooseGenreAction({ genre: value }));
    }
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList activeGenre={genre} onSortClick={handleSortClick} />
      <FilmsList films={films} />
      <ShowMoreButton />
    </section>
  );
}
