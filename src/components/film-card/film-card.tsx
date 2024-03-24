import { useState } from 'react';

type FilmCardProps = {
  key: string;
  filmName: string;
  imageSrc: string;
  imageAlt: string;
};

export default function FilmCard({
  key,
  filmName,
  imageSrc,
  imageAlt,
}: FilmCardProps) {

  const [isActive, setIsActive] = useState(false);

  function onCardActive() {
    setIsActive(true);
  }

  function onCardInActive() {
    setIsActive(false);
  }


  return (
    <div key={key} onMouseEnter={onCardActive} onMouseLeave={onCardInActive} >
      <div className="small-film-card__image">
        {!isActive ? <img src={imageSrc} alt={imageAlt} width={280} height={175} /> : null}
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">
          {filmName}
        </a>
      </h3>
    </div>
  );
}
