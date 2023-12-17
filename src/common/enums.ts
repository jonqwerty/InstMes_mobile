export const LoadingStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

export const StorageKey = {
  AUTH_USER: 'authUser',
};

export enum Screen {
  Register = 'Register',
  Login = 'Login',
  Chat = 'Chat',
  UserChat = 'UserChat',
}
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  Register: {};
  Login: {};
  Chat: {};
  UserChat: {};
};
