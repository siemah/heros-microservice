import React from 'react';
import { Route, Redirect, } from 'react-router-dom';

const PrivateRoute = ({ isAthenticated = false, component: C, ...rest }) => {
  return (
    <Route {...rest} render={
      props =>
        isAthenticated
          ? <C {...props} />
          : <Redirect to='/login' />
    } />
  )
}

export default PrivateRoute;
