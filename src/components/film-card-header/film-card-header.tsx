import Header from '../header/header';
import UserBlock from '../user-block/user-block';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { Film } from '@/types/film';

type FilmCardHeaderProps = {
  film: Film;
};

export default function FilmCardHeader({film}: FilmCardHeaderProps):JSX.Element {

  return (
    <div className="film-card__header">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      <Header className={'page-header'} breadcrumbs={<Breadcrumbs id={film.id} name={film.name} />}>
        <UserBlock />
      </Header>
      <div className="film-card__poster film-card__poster--small">
        <img src={film.posterImage} alt={film.name} width="218" height="327" />
      </div>
    </div>
  );
}
