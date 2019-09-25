import React from 'react';
import { NavLink, } from 'react-router-dom';
import routes from '../routes/config'

const HeaderMenu = () => {
  const linksList = routes.map(({path}) => (
    <li key={path}><NavLink to={path}>{path}</NavLink></li>
  ))
  return (
    <nav>
      <ul>
        { linksList }
      </ul>
    </nav>
  )
}

export default HeaderMenu
