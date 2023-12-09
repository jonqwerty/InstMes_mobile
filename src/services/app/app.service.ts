import {post} from '../../helpers/httpHelper';
import {IRegisterRequest} from '../../store/app/actions';

const App = (() => {
  const register = async (body: IRegisterRequest) => {
    return await post('/register', body);
  };
  const login = async (body: {email: string; password: string}) =>
    await post('/login', body);

  return {
    register,
    login,
  };
})();

export default App;
