import { useAppDispatch, useAppSelector } from '@/hooks';
import ErrorPage from '@/pages/error-page/error-page';
import { postUserCommentAction } from '@/store/api-actions';
import { Comment } from '@/types/comment';
import { useState, ChangeEvent, Fragment, FormEvent } from 'react';
import Spinner from '../spinner/spinner';
import { getPostCommentStatusSelector } from '@/store/reviews-slice/film-review-slice-selectors';
import classes from './add-review-form.module.css';

const COMMENT_LENGTH = {
  min: 50,
  max: 400,
} as const;

const RATING_NUMBER = 10;

const notValidMessage = {
  empty: 'Comment cannot be empty bro, sorry :(',
  commentShort: 'Be awesome. Write something more than 50 characters :)',
  commentLong: 'Sorry bro, your comment is too long',
  ratingEmpty: 'Sorry bro, rating cannot be empty',
};

type AddReviewFormProps = {
  id: string;
};

export default function AddReviewForm({ id }: AddReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const postCommentStatus = useAppSelector(getPostCommentStatusSelector);

  const [formData, setFormData] = useState({
    rating: null,
    comment: '',
  });

  if (!id) {
    return <ErrorPage />;
  }

  const isEmpty = (value: string) => value.trim() === '';

  const isEmptyRating = (value: number | null) => value === null;

  const isNotShort = (value: string) =>
    value.trim().length >= COMMENT_LENGTH.min;

  const isNotTooLong = (value: string) =>
    value.trim().length <= COMMENT_LENGTH.max;

  const validationRules = {
    notEmpty: (value: Comment) =>
      !isEmpty(formData.comment) && !isEmptyRating(value.rating),
    notTooLong: (value: Comment) => isNotTooLong(value.comment),
    notToShort: (value: Comment) => isNotShort(value.comment),
  };

  type validationRulesKeys = keyof typeof validationRules;

  const isValid = Object.keys(validationRules).every((rule) =>
    validationRules[rule as validationRulesKeys](formData)
  );

  const ratingArray = Array.from(
    { length: RATING_NUMBER },
    (_, index) => RATING_NUMBER - index
  );

  function handleInputChange(
    evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { name, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'rating' ? parseInt(value, RATING_NUMBER) : value,
    }));
  }

  const onSubmit = (comment: Comment) => {
    dispatch(postUserCommentAction({ id, comment }));
  };

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (isValid) {
      onSubmit(formData);
    }
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
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
                  checked={formData.rating === rating}
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
            disabled={postCommentStatus.isLoading}
            name="comment"
            id="comment"
            placeholder="Review text"
            value={formData.comment}
            onChange={handleInputChange}
          />
          <div className="add-review__submit">
            <button
              disabled={!isValid || postCommentStatus.isLoading}
              className="add-review__btn"
              type="submit"
            >
              {postCommentStatus.isLoading ? <Spinner /> : 'Post'}
            </button>
          </div>
        </div>
      </form>
      {isEmpty(formData.comment) && (
        <p style={{ color: 'black' }}>{notValidMessage.empty}</p>
      )}
      {isEmptyRating(formData.rating) && (
        <p style={{ color: 'black' }}>{notValidMessage.ratingEmpty}</p>
      )}
      {!isNotShort(formData.comment) && (
        <p className={classes.validationMessage}>
          {notValidMessage.commentShort}
        </p>
      )}
      {!isNotTooLong(formData.comment) && (
        <p className={classes.validationMessage}>
          {notValidMessage.commentLong}
        </p>
      )}
    </div>
  );
}
