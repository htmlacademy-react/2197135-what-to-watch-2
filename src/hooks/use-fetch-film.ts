import { useEffect } from 'react';
import { useAppDispatch } from '.';
import {
  fetchChosenFilm,
  fetchFilmReviews,
  fetchSimilarFilms,
} from '@/store/api-actions';

export const useFetchFilm = (id: string | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchChosenFilm(id));
      dispatch(fetchFilmReviews(id));
      dispatch(fetchSimilarFilms(id));
    }
  }, [id, dispatch]);
};
