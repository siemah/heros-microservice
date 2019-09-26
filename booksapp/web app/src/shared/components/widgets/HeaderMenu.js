import React from 'react';
import { NavLink, } from 'react-router-dom';
import routes from '../routes/config'
import AuthContext from '../context/auth';

const HeaderMenu = () => {
  const _authContext = React.useContext(AuthContext);
  const linksList = routes.map(({path}) => (
    !path.includes('login') &&
    <li key={path}><NavLink to={path}>{path}</NavLink></li>
  ));
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/login'}>
          {
            !!_authContext.user.fullname 
              ? _authContext.user.fullname
              : 'Login'
          }
          </NavLink>
        </li>
        { linksList }
      </ul>
    </nav>
  )
}

export default HeaderMenu
