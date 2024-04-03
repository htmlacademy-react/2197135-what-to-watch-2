import { Review } from '@/types/review';
import UserReviewsColumn from '../user-reviews-column/user-review-column';
type UserReviewsProps = {
  reviews: Review[];
}

export default function UserReviews ({reviews}: UserReviewsProps):JSX.Element {
  const columnLength = Math.ceil(reviews.length / 2);

  const reviewsColumn1 = reviews.slice(0, columnLength);
  const reviewsColumn2 = reviews.slice(columnLength);

  return (
    <div className="film-card__reviews film-card__row">
      <UserReviewsColumn reviews={reviewsColumn1} />
      <UserReviewsColumn reviews={reviewsColumn2} />
    </div>
  );
}
