import classes from './loading-spinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={classes.spinnerContainer}>
      <span className={classes.spinner}></span>
    </div>
  );
}

