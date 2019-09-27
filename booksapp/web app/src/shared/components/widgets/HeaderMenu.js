import React from 'react';
import { NavLink, } from 'react-router-dom';
import routes from '../routes/config'
import AuthContext from '../context/auth';

const HeaderMenu = () => {
  const _authContext = React.useContext(AuthContext);
  const linksList = routes.map(({path, name}) => (
    !path.includes('login') &&
    <li key={path}><NavLink to={path}>{name}</NavLink></li>
  ));
  return (
    <nav>
      <ul>
          {
            !!_authContext.user.fullname 
              ? (
                <React.Fragment>
                <li>
                  <NavLink to='/profile'>{_authContext.user.fullname}</NavLink>
                </li>
                <li><a href='/auth/logout'>Logout</a></li>
                </React.Fragment>
              )
              : (
                <li>
                  <NavLink to={'/login'}>Login</NavLink>
                </li>
              )
        
          }
        { linksList }
      </ul>
    </nav>
  )
}

export default HeaderMenu
