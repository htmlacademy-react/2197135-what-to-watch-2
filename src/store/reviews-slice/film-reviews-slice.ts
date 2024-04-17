import { Review } from '@/types/review';
import { FetchStatus, NameSpace } from '@/utils/const';
import { createSlice } from '@reduxjs/toolkit';
import { fetchFilmReviews, postUserCommentAction } from '../api-actions';

type FilmReviewsSlice = {
  filmReviews: Review[] | [];
  filmReviewsStatus: FetchStatus;
  postReviewStatus: FetchStatus;
};

const initialState: FilmReviewsSlice = {
  filmReviews: [],
  filmReviewsStatus: FetchStatus.Idle,
  postReviewStatus: FetchStatus.Idle,
};

export const filmReviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    resetReviewsAction: (state) => {
      state.filmReviewsStatus = FetchStatus.Idle;
      state.postReviewStatus = FetchStatus.Idle;
      state.filmReviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmReviews.rejected, (state) => {
        state.filmReviewsStatus = FetchStatus.Failed;
      })
      .addCase(fetchFilmReviews.pending, (state) => {
        state.filmReviewsStatus = FetchStatus.Pending;
      })
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.filmReviewsStatus = FetchStatus.Success;
        state.filmReviews = action.payload;
      })
      .addCase(postUserCommentAction.rejected, (state) => {
        state.postReviewStatus = FetchStatus.Failed;
      })
      .addCase(postUserCommentAction.pending, (state) => {
        state.postReviewStatus = FetchStatus.Pending;
      })
      .addCase(postUserCommentAction.fulfilled, (state) => {
        state.postReviewStatus = FetchStatus.Success;
      });
  },
});

export const { resetReviewsAction } = filmReviewsSlice.actions;
