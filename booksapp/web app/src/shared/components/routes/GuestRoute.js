import React from 'react';
import { Route, Redirect, } from 'react-router-dom';

const GuestRoute = ({ isAthenticated = false, component: C, ...rest }) => {
  return (
    <Route {...rest} render={
      props =>
        !isAthenticated
          ? <C {...rest} {...props} />
          : <Redirect to='/home' />
    } />
  )
}

export default GuestRoute;
