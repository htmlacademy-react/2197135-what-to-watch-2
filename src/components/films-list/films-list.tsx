import { useNavigate} from 'react-router-dom';

import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';
import { AppRoute } from '@/utils/const';

type FilmsListProps = {
  films: Film[];
};


export default function FilmsList({ films }: FilmsListProps): JSX.Element {
  const navigate = useNavigate();


  return (
    <div className="catalog__films-list">
      {films.map(({id, name, previewImage,}) => (
        <article key={id}
          className="small-film-card catalog__films-card"
          onClick={()=> navigate(`${AppRoute.Film}${id}`)}
        >
          <FilmCard
            id={id}
            filmName={name}
            imageSrc={previewImage}
            imageAlt={name}
          />
        </article>
      ))}
    </div>
  );
}
