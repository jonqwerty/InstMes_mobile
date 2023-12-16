import {get, post} from '../../helpers/httpHelper';
import {IRegisterRequest} from '../../store/app/actions';

const App = (() => {
  const register = async (body: IRegisterRequest) => {
    return await post('/users/register', body);
  };
  const login = async (body: {email: string; password: string}) =>
    await post('/users/login', body);

  const getUserChats = async (userId: string) => await get(`/chats/${userId}`);

  const getUser = async (userId: string) => await get(`/users/find/${userId}`);

  const getUsers = async () => await get(`/users`);

  const createChat = async (body: {firstId: string; secondId: string}) =>
    await post(`/chats`, body);

  return {
    register,
    login,
    getUserChats,
    getUser,
    getUsers,
    createChat,
  };
})();

export default App;
