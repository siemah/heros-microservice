import React, { useContext, } from 'react'
import SEO from '../../widgets/SEO';
import AuthContext from '../../context/auth';

const Orders = () => {
  const _authContext = useContext(AuthContext);

  return (
    <div>
      <SEO title={`${_authContext.user.fullname} Orders`} />
      <h1>My Orders</h1>
      <nav>
        <ul>
          {/** list of orders with a possibility for cancelation */}
        </ul>
      </nav>
    </div>
  )
}

export default Orders;
