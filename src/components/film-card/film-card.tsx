import { AppRoute } from '@/utils/const';
import { Link, generatePath } from 'react-router-dom';

type FilmCardProps = {
  id: string;
  filmName: string;
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function FilmCard({
  id,
  filmName,
  imageSrc,
  imageAlt,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: FilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <Link to={generatePath(AppRoute.Film, {id})}>
        <div
          className="small-film-card__image"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {isActive ? (
            <img src={imageSrc} alt={imageAlt} width={280} height={175} />
          ) : (
            <img src={imageSrc} alt={imageAlt} width={280} height={175} />
          )}
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link to={generatePath(AppRoute.Film, {id})} className="small-film-card__link">
          {filmName}
        </Link>
      </h3>
    </article>
  );
}
