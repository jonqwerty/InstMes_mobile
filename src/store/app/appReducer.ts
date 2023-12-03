import {createReducer, isAnyOf, SerializedError} from '@reduxjs/toolkit';

import {login, logout, register} from './actions';
import {LoadingStatus} from '../../common/enums';

export interface IAuthUser {
  _id: string;
  name: string;
  email: string;
}

export interface IAuth {
  authUser: IAuthUser | null;
  validationError: SerializedError | null;
  loading: string;
}

const initialState: IAuth = {
  authUser: null,
  validationError: null,
  loading: LoadingStatus.IDLE,
};

const appReducer = createReducer(initialState, builder => {
  builder
    .addCase(register.fulfilled, (state, action) => {
      state.authUser = action.payload;
      state.validationError = null;
      state.loading = LoadingStatus.SUCCEEDED;
    })

    .addCase(logout.fulfilled, state => {
      state.authUser = null;
    })

    .addMatcher(isAnyOf(login.pending), state => {
      state.loading = LoadingStatus.LOADING;
    })

    .addMatcher(isAnyOf(login.rejected), (state, action) => {
      state.loading = LoadingStatus.FAILED;
      state.validationError = action.error;
    });
});
export default appReducer;
