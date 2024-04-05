import { createAction } from '@reduxjs/toolkit';

export const chooseGenreAction = createAction<{genre: string}>('chooseGenre');
export const resetGenreAction = createAction('resetGenre');
