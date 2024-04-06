import { createAction } from '@reduxjs/toolkit';

export const chooseGenreAction = createAction<{ genre: string }>('chooseGenre');
export const resetGenreAction = createAction('resetGenre');
export const showMoreAction = createAction('showMore');
export const resetShownFilmsAction = createAction('resetShownFilms');
