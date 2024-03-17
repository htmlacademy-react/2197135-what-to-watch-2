import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './pages/MainPage';

import {films} from './api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App films={films} />
  </React.StrictMode>
);
