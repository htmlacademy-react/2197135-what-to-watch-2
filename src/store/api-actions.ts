import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  APIRoute,
  AppRoute,
  LoginStatus,
  TIMEOUT_SHOW_ERROR,
} from '@/utils/const';
import {
  loadFilmsAction,
  redirectToRouteAction,
  setAuthorizationAction,
  setErrorAction,
  setFilmsLoadingStatusAction,
} from './action';
import { Film } from '@/types/film';
import { AppDispatch, State } from '@/types/state';
import { LoginData } from '@/types/login-data';
import { dropToken, saveToken } from '@/services/token';
import { UserData } from '@/types/user-data';
import { store } from '.';

export const clearErrorAction = createAsyncThunk('clearAction', () => {
  setTimeout(() => store.dispatch(setErrorAction(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  dispatch(setFilmsLoadingStatusAction(true));
  const { data } = await api.get<Film[]>(APIRoute.Films);
  dispatch(setFilmsLoadingStatusAction(false));
  dispatch(loadFilmsAction(data));
});

export const checkLoginAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkLogin', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(setAuthorizationAction(LoginStatus.Auth));
  } catch {
    dispatch(setAuthorizationAction(LoginStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  LoginData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(setAuthorizationAction(LoginStatus.Auth));
    dispatch(redirectToRouteAction(AppRoute.Main));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setAuthorizationAction(LoginStatus.NoAuth));
});
