import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../redux/Actions/usersAction';

export const useAuth = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const register = (data, callback) => {
    callback(data)
    dispatch(registerUser(data))
  }

  return { store, register }
}