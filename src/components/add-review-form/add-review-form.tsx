import { useAppDispatch, useAppSelector } from '@/hooks';
import ErrorPage from '@/pages/error-page/error-page';
import {
  checkCommentAction,
  fetchChosenFilm,
  postUserCommentAction,
} from '@/store/api-actions';
import { getUserCommentStatus } from '@/store/user-slice/user-slice-selectors';
import { Comment } from '@/types/comment';
import { FetchStatus } from '@/utils/const';
import { useState, ChangeEvent, Fragment, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/spinner';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

const notValidMessage = {
  empty: 'Comment cannot be empty bro, sorry :(',
  commentShort: 'Be awesome. Write something more than 50 characters :)',
  commentLong: 'Sorry bro, your comment is too long',
};

export default function AddReviewForm() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const userCommentStatus = useAppSelector(getUserCommentStatus);

  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
  });

  if (!id) {
    return <ErrorPage />;
  }

  const isEmpty = (value: string) => value.trim() !== '';

  const isNotShort = (value: string) =>
    value.trim().length >= MIN_COMMENT_LENGTH;

  const isNotTooLong = (value: string) =>
    value.trim().length <= MAX_COMMENT_LENGTH;

  const isValid =
    isEmpty(formData.comment) &&
    isNotShort(formData.comment) &&
    isNotTooLong(formData.comment);

  const ratingArray = Array.from({ length: 10 }, (_, index) => 10 - index);

  function handleInputChange(
    evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { name, value } = evt.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'rating' ? parseInt(value, 10) : value,
    }));
  }

  const onSubmit = (comment: Comment) => {
    dispatch(postUserCommentAction({ id, comment }));
    dispatch(checkCommentAction(id));
  };

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (isValid) {
      onSubmit(formData);
      if (id && userCommentStatus === FetchStatus.Success) {
        dispatch(fetchChosenFilm(id));
      }
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
            name="comment"
            id="comment"
            placeholder="Review text"
            value={formData.comment}
            onChange={handleInputChange}
          />
          <div className="add-review__submit">
            <button
              disabled={!isValid && userCommentStatus === FetchStatus.Pending}
              className="add-review__btn"
              type="submit"
            >
              {userCommentStatus === FetchStatus.Pending ? <Spinner /> : 'Post'}
            </button>
          </div>
        </div>
      </form>
      {!isEmpty(formData.comment) && (
        <p style={{ color: 'black' }}>{notValidMessage.empty}</p>
      )}
      {!isNotShort(formData.comment) && (
        <p style={{ color: 'black' }}>{notValidMessage.commentShort}</p>
      )}
      {!isNotTooLong(formData.comment) && (
        <p style={{ color: 'black' }}>{notValidMessage.commentLong}</p>
      )}
    </div>
  );
}
