import Home from '../pages/Home';
import Login from '../pages/Login';
import { postLogin, } from '../../services/auth'
import Books from '../pages/Books';
import { fetchBooks } from '../../services/book';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    mode: 'guest',
    component: Login,
    postLogin: postLogin
  },
  {
    path: '/books',
    mode: 'private',
    component: Books,
    fetchInitialData: (path=null) => {
      return fetchBooks(path.split('/').pop())
    },
  },
];

export default routes;