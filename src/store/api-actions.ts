import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, FilmStatus } from '@/utils/const';
import { Film } from '@/types/film';
import { AppDispatch, State } from '@/types/state';
import { LoginData } from '@/types/login-data';
import { dropToken, saveToken } from '@/services/token';
import { UserData } from '@/types/user-data';
import { redirectToRouteAction } from './action';
import { Review } from '@/types/review';
import { Comment } from '@/types/comment';
import { generatePath } from 'react-router-dom';
import { pushNotification } from './notification-slice/notification-slice';

export const fetchFilmsAction = createAsyncThunk<
  Film[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Cannot load films',
      })
    );
    dispatch(redirectToRouteAction(AppRoute.Error));
    throw err;
  }
});

export const fetchChosenFilm = createAsyncThunk<
  Film,
  Film['id'],
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchChosenFilm', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Cannot load this film',
      })
    );
    throw err;
  }
});

export const fetchSimilarFilms = createAsyncThunk<
  Film[],
  Film['id'],
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchSimilarFilms', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'warning',
        message: 'Similar films were not found',
      })
    );
    throw err;
  }
});

export const fetchFilmReviews = createAsyncThunk<
  Review[],
  Film['id'],
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchComments', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'warning',
        message: 'Cannot laod film reviews',
      })
    );
    throw err;
  }
});

export const fetchPromoFilm = createAsyncThunk<
  Film,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchPromoFilm', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film>(APIRoute.Promo);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Cannot load promo film',
      })
    );
    dispatch(redirectToRouteAction(AppRoute.Error));
    throw err;
  }
});

export const fetchFavoriteFilms = createAsyncThunk<
  Film[],
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchFavoriteFilms', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film[]>(APIRoute.Favorite);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({ type: 'error', message: 'Cannot load favorite films' })
    );
    throw err;
  }
});

export const toggleFilmFavoriteAction = createAsyncThunk<
  Film,
  { id: Film['id']; favoriteStatus: FilmStatus },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'data/toggleFavoriteFilm',
  async ({ id, favoriteStatus }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Film>(
        `${APIRoute.Favorite}/${id}/${favoriteStatus}`
      );
      return data;
    } catch (err) {
      dispatch(
        pushNotification({
          type: 'error',
          message: 'Something went wrong during film status changing',
        })
      );
      throw err;
    }
  }
);

export const postUserCommentAction = createAsyncThunk<
  void,
  { id: Film['id']; comment: Comment },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/postUserComment', async ({ id, comment }, { dispatch, extra: api }) => {
  try {
    await api.post<Comment>(`${APIRoute.Comments}/${id}`, comment);
    dispatch(
      pushNotification({
        type: 'success',
        message: 'Your awesome comment has been sent',
      })
    );
    dispatch(
      redirectToRouteAction(generatePath(AppRoute.Film, { id }) as AppRoute)
    );
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Something went wrong during sending comment',
      })
    );
    throw err;
  }
});

export const checkLoginAction = createAsyncThunk<
  string,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkLogin', async (_arg, { dispatch, extra: api }) => {
  try {
    const {
      data: { avatarUrl },
    } = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoriteFilms());
    return avatarUrl;
  } catch (err) {
    throw new Error('cannot check authorization status');
  }
});

export const loginAction = createAsyncThunk<
  string,
  LoginData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  try {
    const {
      data: { token, avatarUrl },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRouteAction(AppRoute.Main));
    dispatch(fetchFavoriteFilms());
    return avatarUrl;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Something went wrong during logging in',
      })
    );
    throw err;
  }
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(
      pushNotification({
        type: 'success',
        message: 'You have been logged out',
      })
    );
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Something wrong with logging out',
      })
    );
    throw err;
  }
});
