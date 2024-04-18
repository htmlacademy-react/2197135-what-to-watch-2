import { useEffect } from 'react';
import { useAppDispatch } from '.';
import {
  fetchChosenFilm,
  fetchFilmReviews,
  fetchSimilarFilms,
} from '@/store/api-actions';
import { resetReviewsAction } from '@/store/reviews-slice/film-reviews-slice';
import {
  resetFilmAction,
  resetSimilarFilms,
} from '@/store/films-slice/films-slice';

export const useFetchFilm = (id: string | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchChosenFilm(id));
      dispatch(fetchFilmReviews(id));
      dispatch(fetchSimilarFilms(id));
    }
    return () => {
      dispatch(resetFilmAction());
      dispatch(resetReviewsAction());
      dispatch(resetSimilarFilms());
    };
  }, [id, dispatch]);
};
