import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';

import { films } from './mocks/films';
import { myFilms } from './mocks/myFilms';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={films} myFilms={myFilms}/>
  </React.StrictMode>
);
