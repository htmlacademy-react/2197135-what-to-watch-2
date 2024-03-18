import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';

type FilmsListProps = {
  films: Film[];
};

export default function FilmsList({films}: FilmsListProps): JSX.Element {

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <article key={film.id} className="small-film-card catalog__films-card">
          <FilmCard
            key={film.id}
            filmName={film.name}
            imageSrc={film.previewImage}
            imageAlt={film.name}
          />
        </article>
      ))}
    </div>
  );
}
