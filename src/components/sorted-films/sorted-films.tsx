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

  return (
    <section className='catalog catalog--like-this'>
      <h2 className="catalog__title">More like this</h2>
      <FilmsList films={sortedFilms}/>
    </section>
  );
}
