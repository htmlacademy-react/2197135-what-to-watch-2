import { films } from '@/mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import { chooseGenreAction, resetGenreAction} from './action';
import { Genres } from '@/utils/const';


const initialState = {
  genre: Genres.AllGenres,
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
      state.genre = Genres.AllGenres;
      state.films = films;
    });
});
