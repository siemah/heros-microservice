import React, { useContext, useState, } from 'react'
import SEO from '../../widgets/SEO';
import AuthContext from '../../context/auth';
import { getDataFromWindowOrContext } from '../../../utils/data';

const Orders = ({ staticContext, }) => {
  const _authContext = useContext(AuthContext);
  const _orders = getDataFromWindowOrContext('orders', staticContext, []);
  const [orders, setOrders] = useState({
    orders: _orders.orders,
    loading: false,
  });
  console.log(orders.orders);
  return (
    <div>
      <SEO title={`${_authContext.user.fullname} Orders`} />
      <h1>My Orders</h1>
      <nav>
        <ul>
          {
            orders.orders.map( ({ _id, book, createdAt, dueDate, isCanceled}) => (
              <li key={_id}>
                order of book {book} at {createdAt}<br />
                {!isCanceled && <button>cancel</button>}
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Orders;
