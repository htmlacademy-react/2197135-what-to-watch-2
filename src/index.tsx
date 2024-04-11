import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { myFilms } from './mocks/myFilms';
import { store } from './store';
import { Provider } from 'react-redux';
import ErrorMessage from './components/error-message/error-message';
import { checkLoginAction, fetchFilmsAction } from './store/api-actions';

store.dispatch(fetchFilmsAction());
store.dispatch(checkLoginAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App myFilms={myFilms}/>
    </Provider>
  </React.StrictMode>
);
