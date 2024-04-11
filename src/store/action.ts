import { Film } from '@/types/film';
import { AppRoute, LoginStatus } from '@/utils/const';
import { createAction } from '@reduxjs/toolkit';

export const chooseGenreAction = createAction<{ genre: string }>('chooseGenre');
export const resetGenreAction = createAction('resetGenre');
export const showMoreAction = createAction('showMore');
export const resetShownFilmsAction = createAction('resetShownFilms');
export const loadFilmsAction = createAction<[] | Film[]>('data/loadFilms');
export const setAuthorizationAction =
  createAction<LoginStatus>('setAuthorization');
export const setFilmsLoadingStatusAction = createAction<boolean>(
  'setFilmsLoadingStatus'
);
export const redirectToRouteAction = createAction<AppRoute>('redirectToRoute');
