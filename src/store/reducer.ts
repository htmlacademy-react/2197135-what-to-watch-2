import { createReducer } from '@reduxjs/toolkit';
import {
  chooseGenreAction,
  resetGenreAction,
  resetShownFilmsAction,
  showMoreAction,
  loadFilmsAction,
  setErrorAction,
  setFilmsLoadingStatusAction,
  setAuthorizationAction,
} from './action';
import { ALL_GENRES, LoginStatus, MAX_FILM_TO_SHOW } from '@/utils/const';
import { Film } from '@/types/film';

type InitialState = {
  activeGenre: string;
  films: [] | Film[];
  filmsShown: number;
  authorizationStatus: LoginStatus;
  isFilmsLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  activeGenre: ALL_GENRES,
  films: [],
  filmsShown: MAX_FILM_TO_SHOW,
  authorizationStatus: LoginStatus.Unknown,
  isFilmsLoading: false,
  error: null,
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
    })
    .addCase(loadFilmsAction, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilmsLoadingStatusAction, (state, action) => {
      state.isFilmsLoading = action.payload;
    })
    .addCase(setAuthorizationAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setErrorAction, (state, action) => {
      state.error = action.payload;
    });
});
