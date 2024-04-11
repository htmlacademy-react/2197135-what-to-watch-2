import { store } from '@/store';
import { setErrorAction } from '@/store/action';
import { clearErrorAction } from '@/store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorAction(message));
  store.dispatch(clearErrorAction());
};
