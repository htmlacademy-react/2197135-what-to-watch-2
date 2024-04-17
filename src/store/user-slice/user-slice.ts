import { FetchStatus, LoginStatus, NameSpace } from '@/utils/const';
import { createSlice } from '@reduxjs/toolkit';
import { checkLoginAction, loginAction, logoutAction } from '../api-actions';

export type LoginProcess = {
  authorizationStatus: LoginStatus;
  loginStatus: FetchStatus;
};

const initialState: LoginProcess = {
  authorizationStatus: LoginStatus.Unknown,
  loginStatus: FetchStatus.Idle,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkLoginAction.fulfilled, (state) => {
        state.loginStatus = FetchStatus.Success;
        state.authorizationStatus = LoginStatus.Auth;
      })
      .addCase(checkLoginAction.pending, (state) => {
        state.loginStatus = FetchStatus.Pending;
        state.authorizationStatus = LoginStatus.Unknown;
      })
      .addCase(checkLoginAction.rejected, (state) => {
        state.loginStatus = FetchStatus.Failed;
        state.authorizationStatus = LoginStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
        state.loginStatus = FetchStatus.Failed;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
      });
  },
});
