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
    message: null,
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
        _isMount && setOrders({...orders, loading: true}) 
        let _data = await fetchInitialData(null, opts);
        if( _data.orders )
          _isMount && setOrders({...orders, orders: _data.orders, loading: false}) 
        else
          _isMount && setOrders({...orders, message: _data.message, loading: false}) 
        
      } catch (error) {
        _isMount && setOrders({...orders, message: 'Something went wrong', loading: false}) 
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
      {orders.message && <h4><mark>{orders.message}</mark></h4>}
      <nav>
        <ul>
          {orders.loading && <h4>Loading ..</h4>}
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
