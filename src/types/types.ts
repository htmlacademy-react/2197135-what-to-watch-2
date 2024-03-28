export type Review = {
  id: string;
  rating: number;
  text: string;
  user: string;
  date: string;
}

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
  duration: string;
  reviews: Review[];
};


export type FilmDetails = Pick<Film, 'director' | 'actors' | 'year' | 'genre' | 'duration'>

export type FilmInfo = Omit<Film, 'previewVideoLink' | 'genre' | 'year' | 'duration' | 'reviews'>
