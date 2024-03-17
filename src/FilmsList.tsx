import React from 'react';
import FilmCard from './FilmCard';
import { Film } from './api';

type FilmsListProps = {
  films: Film[];
};

export default function FilmsList(props: FilmsListProps) {
  const { films } = props;
  return (
    <div className="catalog__films-list">
      {films.map((film) =>
        <article className="small-film-card catalog__films-card">
          <FilmCard
            key={film.id}
            name={film.name}
            imageSrc={film.previewImage}
            imageAlt={film.name}
          />
        </article>
      )}
    </div>
  );
}
