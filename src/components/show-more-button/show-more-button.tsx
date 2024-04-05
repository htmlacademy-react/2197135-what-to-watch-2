import { useAppDispatch, useAppSelector } from '@/hooks';
import { showMoreAction } from '@/store/action';

export default function ShowMoreButton() {
  const dispatch = useAppDispatch();
  const films = useAppSelector((state) => state.films);
  const allFilms = useAppSelector((state) => state.allFilms);
  const MAX_FILM_SHOWN = 8;

  const isToShowFilms = films.length >= MAX_FILM_SHOWN && films.length < allFilms.length;

  return (
    <div>
      {isToShowFilms && (
        <div className="catalog__more">
          <button
            onClick={() => dispatch(showMoreAction())}
            className="catalog__button"
            type="button"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
