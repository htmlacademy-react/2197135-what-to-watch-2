import { useState } from 'react';
import { Film } from '@/types/film';
import FilmInfo from '../film-info/film-info';
import { ActiveTabs } from '@/utils/const';
import FilmNavigation from '../film-navigation/film-navigation';

type FilmNavigationProps = {
  film: Film;
};

export default function FilmDescription({
  film,
}: FilmNavigationProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(ActiveTabs.Overview);

  const onOverviewHandler = () => {
    setActiveTab(ActiveTabs.Overview);
  };

  const onDetailsHandler = () => {
    setActiveTab(ActiveTabs.Details);
  };

  const onReviewHandler = () => {
    setActiveTab(ActiveTabs.Reviews);
  };

  return (
    <div className="film-card__desc">
      <FilmNavigation
        activeTab={activeTab}
        onOverviewHandler={onOverviewHandler}
        onDetailsHandler={onDetailsHandler}
        onReviewHandler={onReviewHandler}
      />
      <FilmInfo film={film} activeTab={activeTab} />
    </div>
  );
}
