import { genres } from '@/utils/const';
import cn from 'classnames';

type GenresListProps = {
  activeGenre: string;
  onSortClick: (value: string) => void;
};

export default function GenresList({
  activeGenre,
  onSortClick,
}: GenresListProps) {
  return (
    <ul className="catalog__genres-list">
      {Object.entries(genres).map(([key, value]) => (
        <li
          key={key}
          className={cn('catalog__genres-item', {
            'catalog__genres-item--active': activeGenre === value,
          })}
        >
          <a
            href="#"
            className="catalog__genres-link"
            onClick={() => onSortClick(value)}
          >
            {value}
          </a>
        </li>
      ))}
    </ul>
  );
}
