import { AppRoute } from '@/utils/const';
import { Link, generatePath } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  id: string;
  filmName: string;
  imageSrc: string;
  previewVideoLink: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function FilmCard({
  id,
  filmName,
  imageSrc,
  isActive,
  previewVideoLink,
  onMouseEnter,
  onMouseLeave,
}: FilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <Link to={generatePath(AppRoute.Film, { id })}>
        <VideoPlayer
          name={filmName}
          src={previewVideoLink}
          isPlaying={isActive}
          poster={imageSrc}
          width={280}
          height={175}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </Link>
      <h3 className="small-film-card__title">
        <Link
          to={generatePath(AppRoute.Film, { id })}
          className="small-film-card__link"
        >
          {filmName}
        </Link>
      </h3>
    </article>
  );
}
