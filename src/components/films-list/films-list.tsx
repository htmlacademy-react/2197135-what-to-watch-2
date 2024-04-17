import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';
import { useState } from 'react';
import { MAX_SIMILAR_FILM_TO_SHOW } from '@/utils/const';

type FilmsListProps = {
  films: Film[];
  shorted?: boolean;
};

export default function FilmsList({
  films,
  shorted,
}: FilmsListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<string | null>(null);

  if (!films) {
    return <p>Films cannot be loaded</p>;
  }

  const filmsCards = shorted ? films.slice(0, MAX_SIMILAR_FILM_TO_SHOW) : films;

  return (
    <div className="catalog__films-list">
      {filmsCards.map(({ id, name, previewImage, previewVideoLink }) => (
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
