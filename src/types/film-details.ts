import { Film } from './film';

export type FilmDetails = Pick<
  Film,
  'director' | 'starring' | 'released' | 'genre' | 'runTime'
>;
