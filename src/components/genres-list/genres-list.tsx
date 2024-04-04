import { Genres } from '@/utils/const';
import cn from 'classnames';

type GenresListProps = {
  activeGenre: string;
  handleSortClick: (value: Genres) => void;
};

export default function GenresList({
  activeGenre,
  handleSortClick,
}: GenresListProps) {
  return (
    <ul className="catalog__genres-list">
      {Object.entries(Genres).map(([key, value]) => (
        <li
          key={key}
          className={cn('catalog__genres-item', {
            'catalog__genres-item--active': activeGenre === value,
          })}
        >
          <a
            href="#"
            className="catalog__genres-link"
            onClick={() => handleSortClick(value)}
          >
            {value}
          </a>
        </li>
      ))}
    </ul>
  );
}
