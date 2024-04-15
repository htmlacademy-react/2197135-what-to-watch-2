import { Helmet } from 'react-helmet-async';
import classes from './error-page.module.css';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/utils/const';
import { useAppDispatch } from '@/hooks';
import { fetchFilmsAction } from '@/store/api-actions';

export default function ErrorPage() {
  const dispatch = useAppDispatch();
  const handleTryAgain = () => {
    dispatch(fetchFilmsAction());
  };

  return (
    <div className={classes.errorPage__container}>
      <Helmet>
        <title>WTW. Something went wrong.</title>
      </Helmet>
      <h1 className={classes.errorPage__header}>Something went wrong</h1>
      <p className={classes.errorPage__text}>
        Sorry mate. Error has been occured. Please reload and remember, you are
        awesome!
      </p>
      <Link
        to={AppRoute.Main}
        onClick={handleTryAgain}
        className={classes.errorPage__button}
      >
        Press to try again
      </Link>
    </div>
  );
}
