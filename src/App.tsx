import React from 'react';

import MainPage from './pages/MainPage';

import { Film } from './api';

type AppProps = {
  films: Film[];
};

export default function App(props: AppProps) {
  const { films } = props;

  return <MainPage films={films} />;
}
