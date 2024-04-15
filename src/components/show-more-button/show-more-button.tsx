import { useAppDispatch } from '@/hooks';
import { showMoreAction } from '@/store/films-process/films-process-slice';

export default function ShowMoreButton() {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button
        onClick={() => dispatch(showMoreAction())}
        className="catalog__button"
        type="button"
      >
        Show more
      </button>
    </div>
  );
}
