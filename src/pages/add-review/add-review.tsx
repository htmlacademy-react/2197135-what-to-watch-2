import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import FilmHeroblock from '@/components/film-heroblock/film-heroblock';
import { Film } from '@/types/film';
import Page404 from '../page-404/page-404';

type AddReviewProps = {
  films: Film[];
};

type Params = {
  id: string;
};

export default function AddReview({ films }: AddReviewProps): JSX.Element {
  const { id } = useParams<Params>();

  const film = films.find((item) => item.id === id);

  if (!film) {
    return <Page404 />;
  }

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>What to whatch.Add your review</title>
      </Helmet>
      <FilmHeroblock
        filmGenre={film.genre}
        filmImage={film.previewImage}
        filmName={film.name}
        filmYear={film.year}
        id={film.id}
      />
      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              <input
                className="rating__input"
                id="star-10"
                type="radio"
                name="rating"
                defaultValue={10}
              />
              <label className="rating__label" htmlFor="star-10">
                Rating 10
              </label>
              <input
                className="rating__input"
                id="star-9"
                type="radio"
                name="rating"
                defaultValue={9}
              />
              <label className="rating__label" htmlFor="star-9">
                Rating 9
              </label>
              <input
                className="rating__input"
                id="star-8"
                type="radio"
                name="rating"
                defaultValue={8}
                defaultChecked
              />
              <label className="rating__label" htmlFor="star-8">
                Rating 8
              </label>
              <input
                className="rating__input"
                id="star-7"
                type="radio"
                name="rating"
                defaultValue={7}
              />
              <label className="rating__label" htmlFor="star-7">
                Rating 7
              </label>
              <input
                className="rating__input"
                id="star-6"
                type="radio"
                name="rating"
                defaultValue={6}
              />
              <label className="rating__label" htmlFor="star-6">
                Rating 6
              </label>
              <input
                className="rating__input"
                id="star-5"
                type="radio"
                name="rating"
                defaultValue={5}
              />
              <label className="rating__label" htmlFor="star-5">
                Rating 5
              </label>
              <input
                className="rating__input"
                id="star-4"
                type="radio"
                name="rating"
                defaultValue={4}
              />
              <label className="rating__label" htmlFor="star-4">
                Rating 4
              </label>
              <input
                className="rating__input"
                id="star-3"
                type="radio"
                name="rating"
                defaultValue={3}
              />
              <label className="rating__label" htmlFor="star-3">
                Rating 3
              </label>
              <input
                className="rating__input"
                id="star-2"
                type="radio"
                name="rating"
                defaultValue={2}
              />
              <label className="rating__label" htmlFor="star-2">
                Rating 2
              </label>
              <input
                className="rating__input"
                id="star-1"
                type="radio"
                name="rating"
                defaultValue={1}
              />
              <label className="rating__label" htmlFor="star-1">
                Rating 1
              </label>
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              defaultValue={''}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
