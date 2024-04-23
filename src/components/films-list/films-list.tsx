import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';
import { useState } from 'react';

type FilmsListProps = {
  films: Film[];
};

export default function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<string | null>(null);

  if (!films) {
    return <p>Films cannot be loaded</p>;
  }

  return (
    <div className="catalog__films-list">
      {films.map(({ id, name, previewImage, previewVideoLink }) => (
        <FilmCard
          key={id}
          id={id}
          filmName={name}
          imageSrc={previewImage}
          previewVideoLink={previewVideoLink}
          isActive={activeFilmId === id}
          onMouseEnter={() => setActiveFilmId(id)}
          onMouseLeave={() => setActiveFilmId(null)}
        />
      ))}
    </div>
  );
}
