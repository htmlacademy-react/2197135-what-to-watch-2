import cn from 'classnames';

type GenresListProps = {
  activeGenre: string;
  onSortClick: (value: string) => void;
  genres: string[];
};

export default function GenresList({
  activeGenre,
  onSortClick,
  genres,
}: GenresListProps) {
  return (
    <ul className="catalog__genres-list">
      {genres.map((value) => (
        <li
          key={value}
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
