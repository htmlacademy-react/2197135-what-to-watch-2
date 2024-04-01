import { Film } from './film';

export type FilmOverview = Pick<
  Film,
  | 'rating'
  | 'ratingCount'
  | 'ratingLevel'
  | 'description'
  | 'director'
  | 'actors'
>;
