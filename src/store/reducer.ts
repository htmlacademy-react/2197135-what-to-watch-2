import { films } from '@/mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import { chooseGenreAction, resetGenreAction, showMoreAction } from './action';
import { genres } from '@/utils/const';

const initialState = {
  genre: genres[0],
  allFilms: films,
  films: films.slice(0,8),
};

export const reducer = createReducer(initialState, (buider) => {
  buider
    .addCase(chooseGenreAction, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
      state.allFilms = films.filter((film) => film.genre === state.genre);
      state.films = state.allFilms.slice(0, 8);
    })
    .addCase(resetGenreAction, (state) => {
      state.genre = genres[0];
      state.allFilms = films;
      state.films = state.allFilms.slice(0,8);
    })
    .addCase(showMoreAction, (state) => {
      const MAX_FILM_TO_SHOW = 8;
      const startIndex = state.films.length;
      const endIndex = state.films.length + MAX_FILM_TO_SHOW;
      const filmsToAdd = state.genre === genres[0] ? state.allFilms : state.allFilms.filter((film) => film.genre === state.genre);
      state.films = state.films.concat(filmsToAdd.slice(startIndex, endIndex));
    });
});
