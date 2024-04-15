import { State } from '@/types/state';
import { FetchStatus, NameSpace } from '@/utils/const';
import { createSelector } from '@reduxjs/toolkit';

export const getFilms = (state: State) => state[NameSpace.Films].films;
export const getFilm = (state: State) => state[NameSpace.Films].film;
export const getStatus = (state: State) => state[NameSpace.Films].filmsStatus;
export const getFilmsStatus = createSelector([getStatus], (filmsStatus) => ({
  isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(filmsStatus),
  isSuccess: filmsStatus === FetchStatus.Success,
  isError: filmsStatus === FetchStatus.Failed
}));
export const getActiveGenre = (state: State) => state[NameSpace.Films].activeGenre;
export const getFilmsShown = (state: State) => state[NameSpace.Films].filmsShown;
export const getFilmStatus = (state: State) => state[NameSpace.Films].filmStatus;
export const getFilmReviews = (state: State) => state[NameSpace.Films].filmReviews;
