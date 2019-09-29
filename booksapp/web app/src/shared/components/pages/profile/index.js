import React from 'react';
import { NavLink, } from 'react-router-dom'

const ProfileHome = () => {
  return (
    <div>
      <NavLink to={'/profile/orders'}>My Orders</NavLink>
    </div>
  )
}

export default ProfileHome;
