import { Helmet } from 'react-helmet-async';
import classes from './page-404.module.css';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/utils/const';

export default function Page404() {
  return (
    <div className={classes.page404__container}>
      <Helmet>
        <title>Ooops.Not found nothing.</title>
      </Helmet>
      <h1 className={classes.page404__header}>Something went wrong</h1>
      <p className={classes.page404__text} >Page is not found. Please reload and remember, you are awesome!</p>
      <Link to={AppRoute.Main} className={classes.page404__button}>Please press to return to a main page</Link>
    </div>
  );
}
