import { Film } from './film';

export type FilmDetails = Pick<Film, 'director' | 'actors' | 'year' | 'genre' | 'duration'>
