import { Film } from './film';

export type FilmOverview = Pick<
  Film,
  'rating' | 'scoreCount' | 'description' | 'director' | 'starring'
> & {
  ratingLevel: string;
};
