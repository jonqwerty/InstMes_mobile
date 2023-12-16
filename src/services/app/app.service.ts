import {get, post} from '../../helpers/httpHelper';
import {IRegisterRequest} from '../../store/app/actions';

const App = (() => {
  const register = async (body: IRegisterRequest) => {
    return await post('users/register', body);
  };
  const login = async (body: {email: string; password: string}) =>
    await post('users/login', body);

  const getUserChats = async (userId: string) => await get(`chats/${userId}`);

  const getUser = async (userId: string) => await get(`users/find/${userId}`);

  return {
    register,
    login,
    getUserChats,
    getUser,
  };
})();

export default App;
