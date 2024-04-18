import {
  ALL_GENRES,
  FetchStatus,
  MAX_FILM_TO_SHOW,
  NameSpace,
} from '@/utils/const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchChosenFilm,
  fetchFilmsAction,
  fetchPromoFilm,
  fetchSimilarFilms,
} from '../api-actions';
import { Film } from '@/types/film';

type FilmsSlice = {
  films: Film[] | [];
  filmsStatus: FetchStatus;
  promoFilm: Film | null;
  promoFilmStatus: FetchStatus;
  film: Film | null;
  filmStatus: FetchStatus;
  similarFilms: Film[] | [];
  similarFilmsStatus: FetchStatus;
  activeGenre: string;
  filmsShown: number;
};

const initialState: FilmsSlice = {
  films: [],
  filmsStatus: FetchStatus.Idle,
  promoFilm: null,
  promoFilmStatus: FetchStatus.Idle,
  film: null,
  filmStatus: FetchStatus.Idle,
  similarFilms: [],
  similarFilmsStatus: FetchStatus.Idle,
  activeGenre: ALL_GENRES,
  filmsShown: MAX_FILM_TO_SHOW,
};

export const filmSlice = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    chooseGenreAction: (state, action: PayloadAction<string>) => {
      state.activeGenre = action.payload;
    },
    resetGenreAction: (state) => {
      state.activeGenre = ALL_GENRES;
      state.filmsShown = MAX_FILM_TO_SHOW;
    },
    showMoreAction: (state) => {
      state.filmsShown += MAX_FILM_TO_SHOW;
    },
    resetShownFilmsAction: (state) => {
      state.filmsShown = MAX_FILM_TO_SHOW;
    },
    resetFilmAction: (state) => {
      state.film = null;
    },
    resetSimilarFilms: (state) => {
      state.similarFilms = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.filmsStatus = FetchStatus.Failed;
      })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.filmsStatus = FetchStatus.Pending;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.filmsStatus = FetchStatus.Success;
        state.films = action.payload;
      })
      .addCase(fetchPromoFilm.rejected, (state) => {
        state.promoFilmStatus = FetchStatus.Failed;
      })
      .addCase(fetchPromoFilm.pending, (state) => {
        state.promoFilmStatus = FetchStatus.Pending;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.promoFilmStatus = FetchStatus.Success;
      })
      .addCase(fetchChosenFilm.rejected, (state) => {
        state.filmStatus = FetchStatus.Failed;
      })
      .addCase(fetchChosenFilm.pending, (state) => {
        state.filmStatus = FetchStatus.Pending;
      })
      .addCase(fetchChosenFilm.fulfilled, (state, action) => {
        state.filmStatus = FetchStatus.Success;
        state.film = action.payload;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilmsStatus = FetchStatus.Success;
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.similarFilmsStatus = FetchStatus.Pending;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.similarFilmsStatus = FetchStatus.Failed;
      });
  },
});

export const {
  chooseGenreAction,
  resetGenreAction,
  showMoreAction,
  resetShownFilmsAction,
  resetFilmAction,
  resetSimilarFilms,
} = filmSlice.actions;
