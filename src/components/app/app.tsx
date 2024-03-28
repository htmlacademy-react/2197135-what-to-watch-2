import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { Film as FilmType } from '@/types/types';


type AppProps = {
  films: FilmType[];
  myFilms: FilmType[];
};

export default function App({films, myFilms}: AppProps): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage films={films} />} />
          <Route path={AppRoute.SignIn} element={<SignIn />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute loginStatus={LoginStatus.Auth}>
                <MyList myFilms={myFilms} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film} element={<Film films={films} myFilms={myFilms}/>} />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute loginStatus={LoginStatus.Auth}>
                <AddReview films={films} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Player} element={<Player films={films}/>} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
