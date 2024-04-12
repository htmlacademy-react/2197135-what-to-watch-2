import Header from '../header/header';
import UserBlock from '../user-block/user-block';
import { UserControlButtons } from '../user-control-buttons/user-control-buttons';

type FilmHeroblockProps = {
  image: string;
  name: string;
  genre: string;
  year: number;
  id: string;
}

export default function FilmHeroBlock({id, image, name, genre, year}: FilmHeroblockProps): JSX.Element {
  return (
    <div className="film-card__hero">
      <div className="film-card__bg">
        <img src={image} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <Header className={'film-card__head'}>
        <UserBlock />
      </Header>
      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{genre}</span>
            <span className="film-card__year">{year}</span>
          </p>
          <UserControlButtons id={id} />
        </div>
      </div>
    </div>
  );
}
