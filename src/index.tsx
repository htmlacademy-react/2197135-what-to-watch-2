import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { myFilms } from './mocks/myFilms';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { checkLoginAction, fetchFilmsAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchFilmsAction());
store.dispatch(checkLoginAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App myFilms={myFilms}/>
    </Provider>
  </React.StrictMode>
);
