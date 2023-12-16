import {createReducer, isAnyOf, SerializedError} from '@reduxjs/toolkit';

import {
  clearValidationError,
  createChat,
  getUser,
  getUserChats,
  getUsers,
  login,
  logout,
  register,
  resetLoadingState,
} from './actions';
import {LoadingStatus} from '../../common/enums';

export interface IAuthUser {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  updatedAt: string;
  createdAt: string;
}

export interface IUserChatsResponse {
  _id: string;
  members: [string, string];
  createdAt: string;
  updatedAt: string;
}

export interface IAuth {
  authUser: IAuthUser | null;
  validationError: SerializedError | null;
  loading: string;
  userChats: IUserChatsResponse[] | null;
  users: IUser[] | null;
}

const initialState: IAuth = {
  authUser: null,
  validationError: null,
  loading: LoadingStatus.IDLE,
  userChats: null,
  users: null,
};

const appReducer = createReducer(initialState, builder => {
  builder
    .addCase(register.fulfilled, (state, action) => {
      state.authUser = action.payload;
      state.validationError = null;
      state.loading = LoadingStatus.SUCCEEDED;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.authUser = action.payload;
      state.validationError = null;
      state.loading = LoadingStatus.SUCCEEDED;
    })

    .addCase(logout.fulfilled, state => {
      state.authUser = null;
    })
    .addCase(getUserChats.fulfilled, (state, action) => {
      state.userChats = action.payload;
      state.validationError = null;
      state.loading = LoadingStatus.SUCCEEDED;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.validationError = null;
      state.loading = LoadingStatus.SUCCEEDED;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.validationError = null;
      state.loading = LoadingStatus.SUCCEEDED;
    })
    .addCase(createChat.fulfilled, (state, action) => {
      
      state.validationError = null;
      state.loading = LoadingStatus.SUCCEEDED;
    })

    .addCase(clearValidationError, state => {
      state.validationError = null;
    })

    .addCase(resetLoadingState, state => {
      state.loading = LoadingStatus.IDLE;
    })

    .addMatcher(
      isAnyOf(
        register.pending,
        login.pending,
        getUserChats.pending,
        getUser.pending,
        getUsers.pending,
        createChat.pending,
      ),
      state => {
        state.loading = LoadingStatus.LOADING;
      },
    )

    .addMatcher(
      isAnyOf(
        register.rejected,
        login.rejected,
        getUserChats.rejected,
        getUser.rejected,
        getUsers.rejected,
        createChat.rejected,
      ),
      (state, action) => {
        state.loading = LoadingStatus.FAILED;
        state.validationError = action.error;
      },
    );
});
export default appReducer;
