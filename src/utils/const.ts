import { films } from '@/mocks/films';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum LoginStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ActiveTabs {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

const filmGenres = Array.from(new Set(films.map((film) => film.genre)));

export const genres = ['All genres', ...filmGenres];
