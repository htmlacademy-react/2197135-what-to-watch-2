import { useState, ChangeEvent, Fragment, FormEvent } from 'react';

export default function AddReviewForm() {
  const ratingArray = Array.from({length: 10}, (_, index) => 10 - index);

  const [formData, setFormData] = useState({
    rating: '5',
    reviewText: '',
  });

  function handleInputChange(evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const {name, value} = evt.target;
    setFormData((prevState) => ({...prevState, [name]: value}));
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit= {handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {ratingArray.map((rating) => (
              <Fragment key={rating}>
                <input
                  className="rating__input"
                  id={`star-${rating}`}
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={parseInt(formData.rating, 10) === rating}
                  onChange={handleInputChange}
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
            name="reviewText"
            id="review-text"
            placeholder="Review text"
            value={formData.reviewText}
            onChange={handleInputChange}
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
