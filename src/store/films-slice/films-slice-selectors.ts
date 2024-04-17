import { State } from '@/types/state';
import { FetchStatus, NameSpace } from '@/utils/const';
import { createSelector } from '@reduxjs/toolkit';

export const getFilms = (state: State) => state[NameSpace.Films].films;
export const getFilm = (state: State) => state[NameSpace.Films].film;
export const getFilmsStatus = (state: State) =>
  state[NameSpace.Films].filmsStatus;
export const getFilmsStatusSelector = createSelector(
  [getFilmsStatus],
  (filmsStatus) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(filmsStatus),
    isSuccess: filmsStatus === FetchStatus.Success,
    isError: filmsStatus === FetchStatus.Failed,
  })
);
export const getActiveGenre = (state: State) =>
  state[NameSpace.Films].activeGenre;
export const getFilmsShown = (state: State) =>
  state[NameSpace.Films].filmsShown;
export const getFilmStatus = (state: State) =>
  state[NameSpace.Films].filmStatus;
export const getFilmStatusSelector = createSelector(
  [getFilmStatus],
  (filmStatus) => ({
    isLoading: filmStatus === FetchStatus.Pending,
    isSuccess: filmStatus === FetchStatus.Success,
    isError: filmStatus === FetchStatus.Failed,
  })
);
export const getPromoFilm = (state: State) => state[NameSpace.Films].promoFilm;
export const getPromoFilmStatus = (state: State) =>
  state[NameSpace.Films].promoFilmStatus;
export const getPromoFilmStatusSelector = createSelector(
  [getPromoFilmStatus],
  (promoFilmStatus) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(
      promoFilmStatus
    ),
    isSuccess: promoFilmStatus === FetchStatus.Success,
    isError: promoFilmStatus === FetchStatus.Failed,
  })
);
export const getSimilarFilms = (state: State) =>
  state[NameSpace.Films].similarFilms;
export const getSimilarFilmsStatus = (state: State) =>
  state[NameSpace.Films].similarFilmsStatus;
export const getSimilarFilmsStatusSelector = createSelector(
  [getSimilarFilmsStatus],
  (similarFilmsStatus) => ({
    isLoading: similarFilmsStatus === FetchStatus.Pending,
    isError: similarFilmsStatus === FetchStatus.Failed,
    isSuccess: similarFilmsStatus === FetchStatus.Success,
  })
);
