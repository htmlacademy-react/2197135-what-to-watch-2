import { NavLink } from 'react-router-dom';


export default function FilmNavigation(): JSX.Element {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li className="filn-nav__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'film-nav__link--active' : 'film-nav__link'}
            to={''}
          >
            Overview
          </NavLink>
        </li>
        <li className="film-nav__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'fim-nav__link--active' : 'film-nav__link'}
            to={''}
          >
            Details
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'fim-nav__link--active' : 'film-nav__link'}
            to={''}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
