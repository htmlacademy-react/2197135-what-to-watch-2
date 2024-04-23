import { FetchStatus, NameSpace } from '@/utils/const';
import { fetchFavoriteFilms, toggleFilmFavoriteAction } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { Film } from '@/types/film';

type FilmsFavoriteSlice = {
  favoriteFilms: Film[] | [];
  favoriteFilmsStatus: FetchStatus;
  toggleFavoriteStatus: FetchStatus;
};

const initialState: FilmsFavoriteSlice = {
  favoriteFilms: [],
  favoriteFilmsStatus: FetchStatus.Idle,
  toggleFavoriteStatus: FetchStatus.Idle,
};

export const FilmsFavoriteSlice = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilmsStatus = FetchStatus.Failed;
      })
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.favoriteFilmsStatus = FetchStatus.Pending;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilmsStatus = FetchStatus.Pending;
        state.favoriteFilms = action.payload;
      })
      .addCase(toggleFilmFavoriteAction.rejected, (state) => {
        state.toggleFavoriteStatus = FetchStatus.Failed;
      })
      .addCase(toggleFilmFavoriteAction.pending, (state) => {
        state.toggleFavoriteStatus = FetchStatus.Pending;
      })
      .addCase(toggleFilmFavoriteAction.fulfilled, (state) => {
        state.toggleFavoriteStatus = FetchStatus.Success;
      });
  },
});
