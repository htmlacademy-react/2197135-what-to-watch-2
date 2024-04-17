import { State } from '@/types/state';
import { FetchStatus, NameSpace } from '@/utils/const';
import { createSelector } from '@reduxjs/toolkit';

export const getFilmReviews = (state: State) =>
  state[NameSpace.Reviews].filmReviews;
export const getFilmReviewsStatus = (state: State) =>
  state[NameSpace.Reviews].filmReviewsStatus;
export const getFilmReviewsStatusSelector = createSelector(
  [getFilmReviewsStatus],
  (filmReviewsStatus) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(
      filmReviewsStatus
    ),
    isSuccess: filmReviewsStatus === FetchStatus.Success,
    isError: filmReviewsStatus === FetchStatus.Failed,
  })
);
export const getPostCommentStatus = (state: State) =>
  state[NameSpace.Reviews].postReviewStatus;
export const getPostCommentStatusSelector = createSelector(
  [getPostCommentStatus],
  (postCommentStatus) => ({
    isLoading: postCommentStatus === FetchStatus.Pending,
    isSuccess: postCommentStatus === FetchStatus.Success,
    isError: postCommentStatus === FetchStatus.Failed,
  })
);
