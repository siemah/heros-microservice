import Home from '../pages/Home';
import Login from '../pages/Login';

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
  },
];