import { ActiveTabs } from '@/utils/const';
import cn from 'classnames';

type FilmNavigationProps = {
  activeTab: string;
  handleTabClick: (tab: ActiveTabs) => void;
};

export default function FilmNavigation({
  activeTab,
  handleTabClick,
}: FilmNavigationProps): JSX.Element {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {Object.entries(ActiveTabs).map(([key, value]) => (
          <li
            key={key}
            className={cn('film-nav__item', {
              'film-nav__item--active': activeTab === value,
            })}
          >
            <a className="film-nav__link" onClick={() => handleTabClick(value)}>
              {value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
