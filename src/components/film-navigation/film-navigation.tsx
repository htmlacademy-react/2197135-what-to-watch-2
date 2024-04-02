import { ActiveTabs } from '@/utils/const';
import cn from 'classnames';
import TabButton from '../tab-button/tab-button';

type FilmNavigationProps = {
  activeTab: string;
  handleTabClick: (tab: ActiveTabs) => void;
};

export default function FilmNavigation({
  activeTab,
  handleTabClick,
}: FilmNavigationProps): JSX.Element {
  const activeTabsArray = Object.entries(ActiveTabs);

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {activeTabsArray.map(([key, value]) => (
          <li
            key={key}
            className={cn('film-nav__item', {
              'film-nav__item--active': activeTab === value,
            })}
          >
            <TabButton onClick={() => handleTabClick(value)}>{value}</TabButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
