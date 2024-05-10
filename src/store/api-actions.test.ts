import { createAPI } from '@/services/api';
import { State } from '@/types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
  checkLoginAction,
  fetchFavoriteFilms,
  loginAction,
  logoutAction,
} from './api-actions';
import { APIRoute } from '@/utils/const';
import { LoginData } from '@/types/login-data';
import { redirectToRouteAction } from './action';
import * as tokenStorage from '../services/token';
import { pushNotification } from './notification-slice/notification-slice';

type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
const extractActionsType = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ FILMS: { films: [] } });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkLoginAction.pending" and "checkLoginAction.rejected" with thunk "checkLoginAciton"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);
      await store.dispatch(checkLoginAction());
      const actions = extractActionsType(store.getActions());
      expect(actions).toEqual([
        checkLoginAction.pending.type,
        checkLoginAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRote", "loginAction.fulfilled" when server response', async () => {
      const fakeUser: LoginData = { email: 'test@test.ru', password: '123qwe' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRouteAction.type,
        fetchFavoriteFilms.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with recieved token', async () => {
      const fakeUser: LoginData = { email: 'test@test.ru', password: '123qwe' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsType(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        pushNotification.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken"  with "logoutAction"', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(204);

      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
