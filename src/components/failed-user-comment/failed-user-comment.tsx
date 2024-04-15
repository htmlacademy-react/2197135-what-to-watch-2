import classes from './failed-user-comment.module.css';

import { AppRoute } from '@/utils/const';
import { Link, generatePath } from 'react-router-dom';

type FailedUserComment = {
  id: string;
};

export default function FailedUserComment({ id }: FailedUserComment): JSX.Element {

  return (
    <div className={classes.errorCommentContainer}>
      <p className={classes.errorCommentText}>Sorry bro. Something was broken during sending your comment.</p>
      <Link className={classes.errorCommentLink} to={generatePath(AppRoute.Film, { id })}>Return to film page</Link>
    </div>
  );
}
