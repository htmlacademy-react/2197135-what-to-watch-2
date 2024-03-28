import { useState, ChangeEvent, Fragment, FormEvent } from 'react';

export default function AddReviewForm() {
  const ratingArray: number[] = [];
  for (let i = 10; i >= 1; i--) {
    ratingArray.push(i);
  }

  const [formData, setFormData] = useState({
    rating: '5',
    reviewText: '',
  });

  function handleTextChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setFormData({ ...formData, reviewText: evt.target.value });
  }

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, rating: evt.target.value });
  }

  function onSubmitHandler(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onSubmitHandler}>
        <div className="rating">
          <div className="rating__stars">
            {ratingArray.map((rating) => (
              <Fragment key={crypto.randomUUID()}>
                <input
                  className="rating__input"
                  id={`star-${rating}`}
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={parseInt(formData.rating, 10) === rating}
                  onChange={handleRatingChange}
                />
                <label className="rating__label" htmlFor={`star-${rating}`}>
                  Rating {rating}
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={formData.reviewText}
            onChange={handleTextChange}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
