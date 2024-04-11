import { useAppSelector } from '@/hooks';
import classes from './error-message.module.css';

export default function ErrorMessage() {
  const error = useAppSelector((state) => state.error);

  return error ? <div className={classes.ErrorMessage}>{error}</div> : null;
}
