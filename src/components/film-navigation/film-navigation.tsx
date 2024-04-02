import { ActiveTabs } from '@/utils/const';
import cn from 'classnames';

type FilmNavigationProps = {
  activeTab: string;
  handleTabClick: (tab: ActiveTabs) => void;
};

export default function FilmNavigation({
  activeTab,
  handleTabClick
}: FilmNavigationProps): JSX.Element {


  const activeTabsArray = Object.entries(ActiveTabs);

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {activeTabsArray.map(([key, value]) =>
          <li
          key={key}
          className={cn('film-nav__item', {
            'film-nav__item--active': activeTab === value,
          })}
        >
          <button className="film-nav__link" onClick={() => handleTabClick(value)}>
            {value}
          </button>
        </li>
        )}
      </ul>
    </nav>
  );
}
