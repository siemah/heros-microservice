import React from 'react';
import { NavLink, } from 'react-router-dom';
import routes from '../routes/config'
import AuthContext from '../context/auth';
import useStyles from 'isomorphic-style-loader/useStyles';
import style from '../assets/css/navbar.css';
import useRemoveCssStyle from '../hooks/style';

const HeaderMenu = () => {
  useStyles(style);
  useRemoveCssStyle(style)
  const _authContext = React.useContext(AuthContext);
  const linksList = routes.map(({path, name}) => (
    !path.includes('login') && name &&
    <li key={path}><NavLink to={path}>{name}</NavLink></li>
  ));
  return (
    <nav>
      <ul className={style.root}>
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
                <React.Fragment>
                <li>
                  <NavLink to={'/login'}>Login</NavLink>
                </li>
                <li>
                  <NavLink to={'/register'}>Register</NavLink>
                </li>
                </React.Fragment>
              )
        
          }
        { linksList }
      </ul>
    </nav>
  )
};

export default HeaderMenu;
