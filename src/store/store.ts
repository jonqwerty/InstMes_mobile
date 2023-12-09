import {CombinedState, combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import MMKVStorage, {MMKV} from 'react-native-mmkv';

import appReducer, {IAuth} from './app/appReducer';
import * as services from '../services/services';
import loggerMiddleware from './middlewares/loggerMiddleware';
import {
  PersistConfig,
  Storage,
  persistReducer,
  persistStore,
} from 'redux-persist';

const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig: PersistConfig<CombinedState<{app: IAuth}>> = {
  key: 'root',
  storage: reduxStorage,
  // You can add more configuration options here
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {services},
      },
      serializableCheck: false,
    }).concat(loggerMiddleware),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export {store, persistor};
