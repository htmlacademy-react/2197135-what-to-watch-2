import { AppRoute } from '@/utils/const';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type FilmCardProps = {
  id: string;
  filmName: string;
  imageSrc: string;
  imageAlt: string;
};

export default function FilmCard({
  id,
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
    <div key={id} onMouseEnter={onCardActive} onMouseLeave={onCardInActive} >
      <div className="small-film-card__image">
        {!isActive ? <img src={imageSrc} alt={imageAlt} width={280} height={175} /> : null}
      </div>
      <h3 className="small-film-card__title">
        <Link to={`${AppRoute.Film}${id}`} className="small-film-card__link">
          {filmName}
        </Link>
      </h3>
    </div>
  );
}
