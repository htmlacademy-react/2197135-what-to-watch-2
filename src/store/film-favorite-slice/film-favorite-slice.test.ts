import { FetchStatus } from '@/utils/const';
import { filmsFavoriteSlice } from './film-favortie-slice';
import { fetchFavoriteFilms } from '../api-actions';

describe('FilmFavorite Slice', () => {
  it('should return initial state with empty action', () => {
    const epmtyAction = { type: '' };
    const expectedState = {
      favoriteFilms: [],
      favoriteFilmsStatus: FetchStatus.Idle,
      toggleFavoriteStatus: FetchStatus.Idle,
    };

    const result = filmsFavoriteSlice.reducer(expectedState, epmtyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favoriteFilms: [],
      favoriteFilmsStatus: FetchStatus.Idle,
      toggleFavoriteStatus: FetchStatus.Idle,
    };

    const result = filmsFavoriteSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set"FavoriteFilmsStatus: FetchStatus.Pending" when fetching favorite films', () => {
    const expectedState = {
      favoriteFilms: [],
      favoriteFilmsStatus: FetchStatus.Pending,
      toggleFavoriteStatus: FetchStatus.Idle,
    };

    const result = filmsFavoriteSlice.reducer(
      undefined,
      fetchFavoriteFilms.pending
    );

    expect(result).toEqual(expectedState);
  });

  it('should set"FavoriteFilmsStatus: FetchStatus.Failed" when fetching favorite films is failed', () => {
    const expectedState = {
      favoriteFilms: [],
      favoriteFilmsStatus: FetchStatus.Failed,
      toggleFavoriteStatus: FetchStatus.Idle,
    };

    const result = filmsFavoriteSlice.reducer(
      undefined,
      fetchFavoriteFilms.rejected
    );

    expect(result).toEqual(expectedState);
  });
});
