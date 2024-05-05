import { FetchStatus, LoginStatus, NameSpace } from '@/utils/const';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { checkLoginAction, loginAction, logoutAction } from '../api-actions';

export type LoginProcess = {
  authorizationStatus: LoginStatus;
  loginStatus: FetchStatus;
  userAvatar: string;
};

const initialState: LoginProcess = {
  authorizationStatus: LoginStatus.Unknown,
  loginStatus: FetchStatus.Idle,
  userAvatar: '',
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        checkLoginAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loginStatus = FetchStatus.Success;
          state.authorizationStatus = LoginStatus.Auth;
          state.userAvatar = action.payload;
        }
      )
      .addCase(checkLoginAction.pending, (state) => {
        state.loginStatus = FetchStatus.Pending;
        state.authorizationStatus = LoginStatus.Unknown;
      })
      .addCase(checkLoginAction.rejected, (state) => {
        state.loginStatus = FetchStatus.Failed;
        state.authorizationStatus = LoginStatus.NoAuth;
      })
      .addCase(
        loginAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.authorizationStatus = LoginStatus.Auth;
          state.userAvatar = action.payload;
        }
      )
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
        state.loginStatus = FetchStatus.Failed;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
      });
  },
});
