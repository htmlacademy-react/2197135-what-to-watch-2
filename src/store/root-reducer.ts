import { NameSpace } from '@/utils/const';
import { combineReducers } from '@reduxjs/toolkit';
import { filmSlice } from './films-process/films-process-slice';
import { userSlice } from './user-slice/user-slice';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});
