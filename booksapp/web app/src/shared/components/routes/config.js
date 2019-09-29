import Home from '../pages/Home';
import Login from '../pages/Login';
import { postLogin, } from '../../services/auth'
import Books from '../pages/Books';
import { fetchBooks } from '../../services/book';
import { postOrder, fetchOrders } from '../../services/orders';
import Book from '../pages/Book';
import Register from '../pages/Register';
import Orders from '../pages/profile/Orders';
import ProfileHome from '../pages/profile';

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
    component: Login,
    postLogin: postLogin
  },
  {
    path: '/register',
    mode: 'guest',
    component: Register,
    createAccount: postLogin
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
    path: '/book/:id',
    mode: 'private',
    component: Book,
    postOrder,
    fetchInitialData: (path=null, opts) => {
      return fetchBooks(path.split('/').pop(), opts)
    },
  },
  {
    path: '/profile',
    mode: 'private',
    exact: true,
    component: ProfileHome,
  },
  {
    path: '/profile/orders',
    mode: 'private',
    component: Orders,
    // cancelOrder,
    fetchInitialData: (path=null, opts) => {
      return fetchOrders(path, opts)
    },
  },
];

export default routes;