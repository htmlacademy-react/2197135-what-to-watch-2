import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import FilmHeroBlock from '@/components/film-heroblock/film-heroblock';
import Page404 from '../page-404/page-404';
import AddReviewForm from '@/components/add-review-form/add-review-form';
import { useAppSelector } from '@/hooks';

type Params = {
  id: string;
};

export default function AddReview(): JSX.Element {
  const { id } = useParams<Params>();
  const films = useAppSelector((state) => state.films);

  const film = films.find((item) => item.id === id);

  if (!film) {
    return <Page404 />;
  }

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>What to whatch.Add your review</title>
      </Helmet>
      <FilmHeroBlock
        genre={film.genre}
        image={film.previewImage}
        name={film.name}
        year={film.year}
        id={film.id}
      />
      <AddReviewForm />
    </section>
  );
}
