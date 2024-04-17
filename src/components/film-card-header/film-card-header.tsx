import { useAppSelector } from '@/hooks';
import Header from '../header/header';
import UserBlock from '../user-block/user-block';
import { getFilm } from '@/store/films-slice/films-slice-selectors';
import Page404 from '@/pages/page-404/page-404';

export default function FilmCardHeader() {
  const film = useAppSelector(getFilm);

  if (!film) {
    return <Page404 />;
  }

  return (
    <div className="film-card__header">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>
      <Header className={'page-header'} hasBreadcrumbs>
        <UserBlock />
      </Header>
      <div className="film-card__poster film-card__poster--small">
        <img src={film.posterImage} alt={film.name} width="218" height="327" />
      </div>
    </div>
  );
}
