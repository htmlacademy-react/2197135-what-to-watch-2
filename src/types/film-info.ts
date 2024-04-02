import { Film } from './film';

export type FilmInfo = Omit<
  Film,
  'previewVideoLink' | 'genre' | 'year' | 'duration' | 'reviews'
>;
