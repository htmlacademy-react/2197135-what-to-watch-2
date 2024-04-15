import { Review } from '@/types/review';

type UserReviewsColumnProps = {
  reviews: Review[];
};

export default function UserReviewsColumn({ reviews }: UserReviewsColumnProps) {
  return (
    <div className="film-card__reviews-col">
      {reviews.map((review) => (
        <div className="review" key={review.id}>
          <blockquote className="review__quote">
            <p className="review__text">{review.comment}</p>
            <footer className="review__details">
              <cite className="review__author">{review.user}</cite>
              <time
                className="review__date"
                dateTime={new Date(review.date).toDateString()}
              >
                {new Date(review.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </footer>
          </blockquote>
          <div className="review__rating">{review.rating}</div>
        </div>
      ))}
    </div>
  );
}
