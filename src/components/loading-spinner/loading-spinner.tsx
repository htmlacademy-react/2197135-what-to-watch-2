import Spinner from '../spinner/spinner';
import classes from './loading-spinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={classes.spinnerContainer}>
      <Spinner />
    </div>
  );
}
