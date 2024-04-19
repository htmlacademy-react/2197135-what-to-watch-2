import { AppRoute } from '@/utils/const';
import { Link, generatePath } from 'react-router-dom';

type BreadcrumbsProps = {
  id: string;
  name: string;
};

export default function Breadcrumbs({
  id,
  name,
}: BreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link
            to={generatePath(AppRoute.Film, { id })}
            className="breadcrumbs__link"
          >
            {name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
}
