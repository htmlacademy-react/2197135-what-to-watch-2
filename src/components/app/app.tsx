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

import { AppRoute } from '@/utils/const';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '@/services/browser-history';
import ErrorPage from '@/pages/error-page/error-page';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { checkLoginAction } from '@/store/api-actions';
import { useEffect } from 'react';
import { getLoginStatusSelector } from '@/store/user-slice/user-slice-selectors';
import LoadingSpinner from '../loading-spinner/loading-spinner';

export default function App() {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(getLoginStatusSelector);

  useEffect(() => {
    dispatch(checkLoginAction());
  }, [dispatch]);

  if (loginStatus.isLoading) {
    <LoadingSpinner />;
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
                <MyList />
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
          <Route path={AppRoute.Error} element={<ErrorPage />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
