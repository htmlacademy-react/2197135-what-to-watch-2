import { State } from '@/types/state';
import { FetchStatus, NameSpace } from '@/utils/const';
import { createSelector } from '@reduxjs/toolkit';

export const getFavoriteFilms = (state: State) =>
  state[NameSpace.Favorite].favoriteFilms;
export const getFavoriteFilmsStatus = (state: State) =>
  state[NameSpace.Favorite].favoriteFilmsStatus;
export const getFavoriteFilmsStatusSelectors = createSelector(
  [getFavoriteFilmsStatus],
  (favoriteFilmsStatus) => ({
    isLoading: favoriteFilmsStatus === FetchStatus.Pending,
    isError: favoriteFilmsStatus === FetchStatus.Failed,
    isSuccess: favoriteFilmsStatus === FetchStatus.Success,
  })
);
export const getToggleFavoriteStatus = (state: State) =>
  state[NameSpace.Favorite].toggleFavoriteStatus;
export const getToggleFavoriteStatusSelector = createSelector(
  [getToggleFavoriteStatus],
  (toggleFavoriteStatus) => ({
    isLoading: toggleFavoriteStatus === FetchStatus.Pending,
    isError: toggleFavoriteStatus === FetchStatus.Failed,
    isSuccess: toggleFavoriteStatus === FetchStatus.Success,
  })
);
