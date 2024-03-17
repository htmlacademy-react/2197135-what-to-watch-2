import React from 'react';

type Film = {
  name: string;
  imageSrc: string;
  imageAlt: string;
};

export default function FilmCard(props: Film) {
  return (
    <>
      <div className="small-film-card__image">
        <img
          src={props.imageSrc}
          alt={props.imageAlt}
          width={280}
          height={175}
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">
          {props.name}
        </a>
      </h3>
    </>
  );
}
