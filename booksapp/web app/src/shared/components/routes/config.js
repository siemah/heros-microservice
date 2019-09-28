import Home from '../pages/Home';
import Login from '../pages/Login';
import { postLogin, } from '../../services/auth'
import Books from '../pages/Books';
import { fetchBooks } from '../../services/book';
import Book from '../pages/Book';

const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    mode: 'guest',
    name: 'Login',
    component: Login,
    postLogin: postLogin
  },
  {
    path: '/books',
    name: 'Books',
    mode: 'private',
    component: Books,
    fetchInitialData: (path=null, opts) => {
      return fetchBooks(path.split('/').pop(), opts)
    },
  },
  {
    path: '/book',
    mode: 'private',
    component: Book,
    fetchInitialData: (path=null, opts) => {
      return fetchBooks(path.split('/').pop(), opts)
    },
  },
];

export default routes;