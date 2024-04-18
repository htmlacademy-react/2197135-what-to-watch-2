import { NameSpace } from '@/utils/const';
import { combineReducers } from '@reduxjs/toolkit';
import { filmSlice } from './films-slice/films-slice';
import { userSlice } from './user-slice/user-slice';
import { filmReviewsSlice } from './reviews-slice/film-reviews-slice';
import { notificationSlice } from './notification-slice/notification-slice';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Reviews]: filmReviewsSlice.reducer,
  [NameSpace.Notification]: notificationSlice.reducer,
});
