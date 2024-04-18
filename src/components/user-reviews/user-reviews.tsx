import { useAppSelector } from '@/hooks';
import UserReviewsColumn from '../user-reviews-column/user-review-column';
import { Review } from '@/types/review';
import { getFilmReviewsStatusSelector } from '@/store/reviews-slice/film-review-slice-selectors';
import Spinner from '../spinner/spinner';

type UserReviewProps = {
  reviews: [] | Review[];
};

export default function UserReviews({ reviews }: UserReviewProps): JSX.Element {
  const reviewsStatus = useAppSelector(getFilmReviewsStatusSelector);

  const columnLength = Math.ceil(reviews.length / 2);

  const reviewsColumn1 = reviews.slice(0, columnLength);
  const reviewsColumn2 = reviews.slice(columnLength);

  if(reviewsStatus.isLoading) {
    return (<Spinner />);
  }

  return (
    <div className="film-card__reviews film-card__row">
      {reviews.length === 0 && (
        <p style={{ color: 'black' }}>
          Oh, there is no reviews yet. You can be first!
        </p>
      )}
      <UserReviewsColumn reviews={reviewsColumn1} />
      <UserReviewsColumn reviews={reviewsColumn2} />
    </div>
  );
}
