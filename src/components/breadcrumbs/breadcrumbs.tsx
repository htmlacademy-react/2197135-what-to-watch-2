import { useAppSelector } from '@/hooks';
import { getFilm } from '@/store/films-slice/films-slice-selectors';
import { AppRoute } from '@/utils/const';
import { Link, generatePath } from 'react-router-dom';

export default function Breadcrumbs() {
  const film = useAppSelector(getFilm);

  if (!film) {
    return;
  }

  const { id } = film;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link
            to={generatePath(AppRoute.Film, { id })}
            className="breadcrumbs__link"
          >
            {film.name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
}
