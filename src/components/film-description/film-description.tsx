import { useState } from 'react';
import FilmInfo from '../film-info/film-info';
import { ActiveTabs } from '@/utils/const';
import FilmNavigation from '../film-navigation/film-navigation';
import { ChosenFilm } from '@/types/chosenFilm';

type FilmNavigationProps = {
  film: ChosenFilm;
};

export default function FilmDescription({
  film,
}: FilmNavigationProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(ActiveTabs.Overview);

  const handleTabClick = (tab: ActiveTabs) => {
    setActiveTab(ActiveTabs[tab]);
  };

  return (
    <div className="film-card__desc">
      <FilmNavigation activeTab={activeTab} handleTabClick={handleTabClick} />
      <FilmInfo film={film} activeTab={activeTab} />
    </div>
  );
}
