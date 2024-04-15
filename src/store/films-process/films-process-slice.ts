import {
  ALL_GENRES,
  FetchStatus,
  MAX_FILM_TO_SHOW,
  NameSpace,
} from '@/utils/const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchChosenFilm, fetchFilmsAction } from '../api-actions';
import { Film } from '@/types/film';
import { ChosenFilm } from '@/types/chosenFilm';
import { Review } from '@/types/review';

type FilmsProcess = {
  films: Film[] | [];
  filmsStatus: FetchStatus;
  film: ChosenFilm | null;
  filmStatus: FetchStatus;
  activeGenre: string;
  filmsShown: number;
  filmReviews: Review[] | [];
};

const initialState: FilmsProcess = {
  films: [],
  filmsStatus: FetchStatus.Idle,
  film: null,
  filmStatus: FetchStatus.Idle,
  activeGenre: ALL_GENRES,
  filmsShown: MAX_FILM_TO_SHOW,
  filmReviews: [],
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
      .addCase(fetchChosenFilm.rejected, (state) => {
        state.filmStatus = FetchStatus.Failed;
      })
      .addCase(fetchChosenFilm.pending, (state) => {
        state.filmStatus = FetchStatus.Pending;
      })
      .addCase(fetchChosenFilm.fulfilled, (state, action) => {
        state.film = action.payload.chosenFilm;
        state.filmReviews = action.payload.filmComments;
        state.filmStatus = FetchStatus.Success;
      });
  },
});

export const {
  chooseGenreAction,
  resetGenreAction,
  showMoreAction,
  resetShownFilmsAction,
} = filmSlice.actions;
