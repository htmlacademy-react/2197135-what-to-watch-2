import {MockStore, configureMockStore} from '@jedmao/redux-mock-store';
import {redirect} from './redirect';
import browserHistory from '@/services/browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { State } from '@/types/state';
import { redirectToRouteAction } from '../action';
import { AppRoute } from '@/utils/const';

vi.mock('../../browser-hisotry', () => ({
  default: {
    location: { pathname: ' '},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe(' Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const MockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = MockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it(' should redirect to"/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRouteAction(AppRoute.SignIn);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.SignIn);
  });
});
