import { State } from '@/types/state';
import { NameSpace } from '@/utils/const';

export const getAuthStatus = (state: State) =>
  state[NameSpace.User].authorizationStatus;
export const getIsLoginPendin = (state: State) =>
  state[NameSpace.User].isLoginPending;
export const getUserCommentStatus = (state: State) =>
  state[NameSpace.User].userCommentStatus;
