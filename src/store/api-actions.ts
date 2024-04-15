import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '@/utils/const';
import { Film } from '@/types/film';
import { AppDispatch, State } from '@/types/state';
import { LoginData } from '@/types/login-data';
import { dropToken, saveToken } from '@/services/token';
import { UserData } from '@/types/user-data';
import { redirectToRouteAction } from './action';
import { ChosenFilm } from '@/types/chosenFilm';
import { Review } from '@/types/review';
import { Comment } from '@/types/comment';
import { toast } from 'react-toastify';

export const fetchFilmsAction = createAsyncThunk<
  Film[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<Film[]>(APIRoute.Films);
  return data;
});

export const fetchChosenFilm = createAsyncThunk<
  { chosenFilm: ChosenFilm; filmComments: Review[] },
  ChosenFilm['id'],
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchChosenFilm', async (id, { extra: api }) => {
  if (!id) {
    throw 'error';
  }

  const FilmResponse = await api.get<ChosenFilm>(`${APIRoute.Films}/${id}`);
  const commentsResponse = await api.get<Review[]>(
    `${APIRoute.Comments}/${id}`
  );
  const data = {
    chosenFilm: FilmResponse.data,
    filmComments: commentsResponse.data,
  };
  return data;
});

export const postUserCommentAction = createAsyncThunk<
  void,
  { id: ChosenFilm['id']; comment: Comment },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/postUserComment', async ({ id, comment }, { dispatch, extra: api }) => {
  try {
    await api.post<Comment>(`${APIRoute.Comments}/${id}`, comment);
    dispatch(redirectToRouteAction(AppRoute.Film));
  } catch (err) {
    toast.warn('Something was broken');
  }
});

export const checkCommentAction = createAsyncThunk<
  void,
  ChosenFilm['id'],
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/checkComment', async (id, { extra: api }) => {
  await api.get(`${APIRoute.Comments}/${id}`);
});

export const checkLoginAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkLogin', async (_arg, { extra: api }) => {
  await api.get(APIRoute.Login);
});

export const loginAction = createAsyncThunk<
  void,
  LoginData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(token);
  dispatch(redirectToRouteAction(AppRoute.Main));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
