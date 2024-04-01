import cn from 'classnames';

type FilmNavigationProps = {
  activeTab: string;
  onDetailsHandler: () => void;
  onOverviewHandler: () => void;
  onReviewHandler: () => void;
};

export default function FilmNavigation({
  activeTab,
  onDetailsHandler,
  onOverviewHandler,
  onReviewHandler,
}: FilmNavigationProps): JSX.Element {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li
          className={cn('film-nav__item', {
            'film-nav__item--active': activeTab === 'Overview',
          })}
        >
          <button className="film-nav__link" onClick={onOverviewHandler}>
            Overview
          </button>
        </li>
        <li
          className={cn('film-nav__item', {
            'film-nav__item--active': activeTab === 'Details',
          })}
        >
          <button className="film-nav__link" onClick={onDetailsHandler}>
            Details
          </button>
        </li>
        <li
          className={cn('film-nav__item', {
            'film-nav__item--active': activeTab === 'Reviews',
          })}
        >
          <button className="film-nav__link" onClick={onReviewHandler}>
            Reviews
          </button>
        </li>
      </ul>
    </nav>
  );
}
