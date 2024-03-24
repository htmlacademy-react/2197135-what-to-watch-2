import { Link, useNavigate} from 'react-router-dom';
import { AppRoute } from '@/utils/const';
import Header from '../header/header';


type FilmHeroblockProps = {
  filmImage: string;
  filmName: string;
  filmGenre: string;
  filmYear: number;
  id: string;
}

export default function FilmHeroblock({id, filmImage, filmName, filmGenre, filmYear}: FilmHeroblockProps): JSX.Element {
  const navigate = useNavigate();


  return (
    <div className="film-card__hero">
      <div className="film-card__bg">
        <img src={filmImage} alt={filmName} />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <Header />
      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{filmName}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{filmGenre}</span>
            <span className="film-card__year">{filmYear}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player + id}`)}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <button className="btn btn--list film-card__button" type="button">
              <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add"></use>
              </svg>
              <span>My list</span>
              <span className="film-card__count">9</span>
            </button>
            <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
