import { Film } from '@/types/film';
import FilmsList from '../films-list/films-list';

type SortedFilmsProps = {
  films: Film[];
  genre: string;
};

export default function SortedFilms({
  films,
  genre,
}: SortedFilmsProps): JSX.Element {
  const sortedFilms = films.filter((film) => film.genre === genre);

  return <FilmsList films={sortedFilms} />;
}
