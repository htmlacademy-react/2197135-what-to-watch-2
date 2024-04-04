import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { myFilms } from './mocks/myFilms';

import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App myFilms={myFilms}/>
    </Provider>
  </React.StrictMode>
);
