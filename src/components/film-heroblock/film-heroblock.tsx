import { Film } from '@/types/film';
import Header from '../header/header';
import UserBlock from '../user-block/user-block';
import { UserControlButtons } from '../user-control-buttons/user-control-buttons';

type FilmHeroblockProps = {
  film: Film;
  className: string;
};

export default function FilmHeroBlock({
  film,
  className,
}: FilmHeroblockProps): JSX.Element {
  return (
    <>
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <Header className={className}>
        <UserBlock />
      </Header>
      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{film.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{film.genre}</span>
            <span className="film-card__year">{film.released}</span>
          </p>
          <UserControlButtons id={film.id} />
        </div>
      </div>
    </>
  );
}
