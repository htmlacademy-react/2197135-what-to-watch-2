import { Review } from './review';

export type Film = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
  year: number;
  rating: number;
  ratingLevel: string;
  ratingCount: number;
  director: string;
  actors: string[];
  description: string;
  duration: number;
  reviews: Review[];
};

