import { Genres } from '@/utils/const';
import { createAction } from '@reduxjs/toolkit';

export const chooseGenreAction = createAction<{genre: Genres}>('chooseGenre');
export const resetGenreAction = createAction('resetGenre');
