import classes from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={classes.spinnerContainer}>
      <span className={classes.spinner}></span>
    </div>
  );
}
