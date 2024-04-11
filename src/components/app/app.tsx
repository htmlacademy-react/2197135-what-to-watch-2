import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import PrivateRoute from '../private-route/private-route';
import MainPage from '@/pages/main-page/main-page';
import AddReview from '@/pages/add-review/add-review';
import Film from '@/pages/film/film';
import MyList from '@/pages/my-list/my-list';
import Player from '@/pages/player/player';
import SignIn from '@/pages/sign-in/sign-in';
import Page404 from '@/pages/page-404/page-404';

import { AppRoute, LoginStatus } from '@/utils/const';
import { Film as FilmType } from '@/types/film';
import { useAppSelector } from '@/hooks';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '@/services/browser-history';

type AppProps = {
  myFilms: FilmType[];
};

export default function App({ myFilms }: AppProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const isFilmsLoading = useAppSelector((state) => state.isFilmsLoading);

  if (authStatus === LoginStatus.Unknown || isFilmsLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route path={AppRoute.SignIn} element={<SignIn />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute>
                <MyList myFilms={myFilms} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film} element={<Film />} />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute>
                <AddReview />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Player} element={<Player />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
