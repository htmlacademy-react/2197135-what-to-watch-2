import FilmCard from '../film-card/film-card';
import { Film } from '../../types/types';
import { useState } from 'react';

type FilmsListProps = {
  films: Film[];
};


export default function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<string | null>(null);


  return (
    <div className="catalog__films-list">
      {films.map(({id, name, previewImage}) => (
        <FilmCard
          key={id}
          id={id}
          filmName={name}
          imageSrc={previewImage}
          imageAlt={name}
          isActive={activeFilmId === id}
          onMouseEnter={() => setActiveFilmId(id)}
          onMouseLeave={() => setActiveFilmId(null)}
        />
      ))}
    </div>
  );
}
