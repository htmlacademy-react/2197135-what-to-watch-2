import { films } from '@/mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import { chooseGenreAction, resetGenreAction} from './action';
import { genres } from '@/utils/const';


const initialState = {
  genre: genres[0],
  films: films
};

export const reducer = createReducer(initialState, (buider) => {
  buider
    .addCase(chooseGenreAction, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
      state.films = films.filter((film) => film.genre === state.genre);
    })
    .addCase(resetGenreAction, (state) => {
      state.genre = genres[0];
      state.films = films;
    });
});
