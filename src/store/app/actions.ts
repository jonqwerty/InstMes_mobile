import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import ActionType from './common';
import * as appServices from '../../services/services';
import storageMMKV from '../../mmkv/storageMMKV';
import {StorageKey} from '../../common/enums';
import {
  IAuthUser,
  IGetMessagesResponse,
  IUser,
  IUserChatsResponse,
} from './appReducer';

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

const getUserChats = createAsyncThunk<IUserChatsResponse[], string, IServices>(
  ActionType.GET_USER_CHATS,
  async (userId, {extra: {services}}) => {
    const {data} = await services.app.getUserChats(userId);
    return data;
  },
);

const getUser = createAsyncThunk<IUser, string, IServices>(
  ActionType.GET_USER,
  async (userId, {extra: {services}}) => {
    const {data} = await services.app.getUser(userId);
    return data;
  },
);

const getUsers = createAsyncThunk<IUser[], {}, IServices>(
  ActionType.GET_USERS,
  async (userId, {extra: {services}}) => {
    const {data} = await services.app.getUsers();
    return data;
  },
);

const createChat = createAsyncThunk<
  {},
  {firstId: string; secondId: string},
  IServices
>(ActionType.CREATE_CHAT, async (body, {extra: {services}}) => {
  const {data} = await services.app.createChat(body);
  return data;
});

const getMessages = createAsyncThunk<IGetMessagesResponse[], string, IServices>(
  ActionType.GET_MESSAGES,
  async (chatId, {extra: {services}}) => {
    const {data} = await services.app.getMessages(chatId);
    return data;
  },
);

const sendMessage = createAsyncThunk<
  {},
  {
    chatId: string;
    senderId: string;
    text: string;
  },
  IServices
>(ActionType.SEND_MESSAGE, async (body, {extra: {services}}) => {
  const {data} = await services.app.sendMessage(body);
  return data;
});

const clearValidationError = createAction(ActionType.CLEAR_VALIDATION_ERROR);
const resetLoadingState = createAction(ActionType.RESET_LOADING_STATE);
const setCurrentChat = createAction<IUserChatsResponse | null>(
  ActionType.SET_CURRENT_CHAT,
);

export {
  register,
  login,
  logout,
  clearValidationError,
  resetLoadingState,
  getUserChats,
  getUser,
  getUsers,
  createChat,
  setCurrentChat,
  getMessages,
  sendMessage,
};
