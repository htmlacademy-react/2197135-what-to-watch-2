import { FetchStatus, LoginStatus, NameSpace } from '@/utils/const';
import { createSlice } from '@reduxjs/toolkit';
import {
  checkCommentAction,
  checkLoginAction,
  loginAction,
  logoutAction,
} from '../api-actions';

export type LoginProcess = {
  authorizationStatus: LoginStatus;
  isLoginPending: FetchStatus;
  userCommentStatus: FetchStatus;
};

const initialState: LoginProcess = {
  authorizationStatus: LoginStatus.Unknown,
  isLoginPending: FetchStatus.Idle,
  userCommentStatus: FetchStatus.Idle,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    resetUserCommentAction: (state) => {
      state.userCommentStatus = FetchStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkLoginAction.fulfilled, (state) => {
        state.isLoginPending = FetchStatus.Success;
        state.authorizationStatus = LoginStatus.Auth;
      })
      .addCase(checkLoginAction.pending, (state) => {
        state.isLoginPending = FetchStatus.Pending;
        state.authorizationStatus = LoginStatus.Unknown;
      })
      .addCase(checkLoginAction.rejected, (state) => {
        state.isLoginPending = FetchStatus.Failed;
        state.authorizationStatus = LoginStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
        state.isLoginPending = FetchStatus.Failed;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
      })
      .addCase(checkCommentAction.fulfilled, (state) => {
        state.userCommentStatus = FetchStatus.Success;
      })
      .addCase(checkCommentAction.pending, (state) => {
        state.userCommentStatus = FetchStatus.Pending;
      })
      .addCase(checkCommentAction.rejected, (state) => {
        state.userCommentStatus = FetchStatus.Failed;
      });
  },
});

export const { resetUserCommentAction } = userSlice.actions;
