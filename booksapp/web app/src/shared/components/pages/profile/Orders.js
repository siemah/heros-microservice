import React, { useContext, useState, useEffect,  } from 'react'
import SEO from '../../widgets/SEO';
import AuthContext from '../../context/auth';
import { getDataFromWindowOrContext } from '../../../utils/data';

const Orders = ({ staticContext, fetchInitialData, }) => {
  const _authContext = useContext(AuthContext);
  const _orders = getDataFromWindowOrContext('orders', staticContext, []);
  const [orders, setOrders] = useState({
    orders: _orders.orders,
    loading: false,
  });

  useEffect(() => {
    let _isMount = true;
    const _fetchData = async () => {
      let opts = {
        headers: {
          Authorization: `JWT ${_authContext.user.token}`,
        }
      }
      try {
        console.log(` fetch ${!orders.orders && 'ok'}`)
        let _data = await fetchInitialData(null, opts);
        if( _data.orders )
          _isMount && setOrders({...orders, orders: _data.orders}) 
      } catch (error) {
        _isMount && setOrders({...orders, message: 'Something went wrong'}) 
      }
    }
    !orders.orders && _fetchData();
    
    return () => {
    _isMount = false;
    };
  }, []);
  return (
    <div>
      <SEO title={`${_authContext.user.fullname} Orders`} />
      <h1>My Orders</h1>
      <nav>
        <ul>
          {
            orders.orders && orders.orders.map( ({ _id, book, createdAt, dueDate, isCanceled}) => (
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
