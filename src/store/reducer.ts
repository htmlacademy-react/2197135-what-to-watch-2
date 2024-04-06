import { films } from '@/mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import {
  chooseGenreAction,
  resetGenreAction,
  resetShownFilmsAction,
  showMoreAction,
} from './action';
import { ALL_GENRES, MAX_FILM_TO_SHOW } from '@/utils/const';

const initialState = {
  activeGenre: ALL_GENRES,
  films: films,
  filmsShown: MAX_FILM_TO_SHOW,
};

export const reducer = createReducer(initialState, (buider) => {
  buider
    .addCase(chooseGenreAction, (state, action) => {
      const { genre } = action.payload;
      state.activeGenre = genre;
    })
    .addCase(resetGenreAction, (state) => {
      state.activeGenre = ALL_GENRES;
      state.filmsShown = MAX_FILM_TO_SHOW;
    })
    .addCase(showMoreAction, (state) => {
      state.filmsShown += MAX_FILM_TO_SHOW;
    })
    .addCase(resetShownFilmsAction, (state) => {
      state.filmsShown = MAX_FILM_TO_SHOW;
    });
});
