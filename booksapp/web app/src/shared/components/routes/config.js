import Home from '../pages/Home';
import Login from '../pages/Login';
import { postLogin, } from '../../services/auth'

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    exact: true,
    mode: 'guest',
    component: Login,
    postLogin: postLogin
  },
];