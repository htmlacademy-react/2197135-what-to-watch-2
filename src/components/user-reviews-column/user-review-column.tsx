import { Review } from '@/types/review';

type UserReviewsColumnProps = {
  reviews: Review[];
}

export default function UserReviewsColumn ({reviews}: UserReviewsColumnProps) {
  return (
    <div className="film-card__reviews-col">
      {reviews.map((review) => (
        <div className="review" key={review.id}>
          <blockquote className="review__quote">
            <p className="review__text">
              {review.text}
            </p>
            <footer className="review__details">
              <cite className="review__author">{review.user}</cite>
              <time className="review__date" dateTime={review.date}>
                {review.date}
              </time>
            </footer>
          </blockquote>
          <div className="review__rating">{review.rating}</div>
        </div>
      ))}
    </div>
  );
}
