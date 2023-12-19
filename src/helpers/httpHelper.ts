import axios from 'axios';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import {
  AnyAction,
  CombinedState,
  MiddlewareArray,
  ThunkMiddleware,
} from '@reduxjs/toolkit';

import {IAuth} from '../store/app/appReducer';
import * as services from '../services/services';
import {appActionCreator} from '../store/actions';

export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const ENV = {
  API_PATH: 'http://192.168.0.5:5000/api',
};



export const axiosApi = axios.create({
  baseURL: ENV.API_PATH,
});

export default {
  setupInterceptors: (
    store: ToolkitStore<
      CombinedState<{
        auth: IAuth;
      }>,
      AnyAction,
      MiddlewareArray<
        [
          ThunkMiddleware<
            CombinedState<{
              auth: IAuth;
            }>,
            AnyAction,
            {
              services: typeof services;
            }
          >,
          () => (next: any) => (action: any) => any,
        ]
      >
    >,
  ) => {
    const addAuthorizationHeader = (
      config: {headers?: object},
      token: string | undefined,
    ) => ({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    axiosApi.interceptors.request.use(
      config => {
        // if (config.url !== REFRESH_TOKEN_URL) {
        //   const token = storageMMKV.getString(StorageKey.ACCESS_TOKEN);
        //   config = addAuthorizationHeader(config, token);
        // } else {
        //   const refreshToken = storageMMKV.getString(StorageKey.REFRESH_TOKEN);
        //   config = addAuthorizationHeader(config, refreshToken);
        // }
        return config;
      },
      async error => {
        await Promise.reject(error.response?.data ?? 'Wrong Services 22');
      },
    );

    axiosApi.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        // store.dispatch(appActionCreator.logout({}));
        return await Promise.reject(error.response?.data || 'Wrong Services');
      },
    );
  },
};

const get = async (url: string, config?: object) =>
  await axiosApi.get(url, {...config}).catch(error => {
    throw error.message || error.response?.data || error;
  });

const post = async (url: string, data: object, config?: object) =>
  await axiosApi.post(url, {...data}, {...config}).catch(error => {
    throw error.response?.data || error.message || error;
  });

const put = async (url: string, data: object, config?: object) =>
  await axiosApi.put(url, {...data}, {...config}).catch(error => {
    throw error?.response?.data || error?.message || error;
  });

const patch = async (url: string, data: object, config?: object) =>
  await axiosApi.patch(url, {...data}, {...config}).catch(error => {
    throw error.message || error.response?.data || error;
  });

const del = async (url: string, config?: object) =>
  await axiosApi.delete(url, {...config}).catch(error => {
    throw error.message || error.response?.data || error;
  });

export {get, post, put, patch, del};
