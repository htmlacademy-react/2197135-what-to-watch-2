import { State } from '@/types/state';
import { FetchStatus, NameSpace } from '@/utils/const';
import { createSelector } from '@reduxjs/toolkit';

export const getAuthStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;
export const getLoginStatus = (state: State) =>
  state[NameSpace.User].loginStatus;
export const getLoginStatusSelector = createSelector(
  [getLoginStatus],
  (loginStatus) => ({
    isLoading: loginStatus === FetchStatus.Pending,
    isSuccess: loginStatus === FetchStatus.Success,
    isError: loginStatus === FetchStatus.Failed,
  })
);
export const getUserAvatar = (state: State) => state[NameSpace.User].userAvatar;
