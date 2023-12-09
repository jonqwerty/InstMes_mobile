import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import ActionType from './common';
import * as appServices from '../../services/services';
import storageMMKV from '../../mmkv/storageMMKV';
import {StorageKey} from '../../common/enums';
import {IAuthUser} from './appReducer';

interface IServices {
  extra: {
    services: typeof appServices;
  };
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

const register = createAsyncThunk<IAuthUser, IRegisterRequest, IServices>(
  ActionType.REGISTER,
  async (request, {extra: {services}}) => {
    const {data} = await services.app.register(request);

    storageMMKV.set(StorageKey.AUTH_USER, JSON.stringify(data));

    return data;
  },
);

const login = createAsyncThunk<
  IAuthUser,
  {email: string; password: string},
  IServices
>(ActionType.LOG_IN, async (body, {extra: {services}}) => {
  const {data} = await services.app.login(body);

  storageMMKV.set(StorageKey.AUTH_USER, JSON.stringify(data));
  return data;
});

const logout = createAsyncThunk<{}, {}, IServices>(
  ActionType.LOG_OUT,
  async (payload, {extra: {services}}) => {
    storageMMKV.deleteItem(StorageKey.AUTH_USER);
  },
);

const clearValidationError = createAction(ActionType.CLEAR_VALIDATION_ERROR);
const resetLoadingState = createAction(ActionType.RESET_LOADING_STATE);

export {register, login, logout, clearValidationError, resetLoadingState};
