import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './pages/main-page/main-page';

import {films} from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={films} />
  </React.StrictMode>
);
