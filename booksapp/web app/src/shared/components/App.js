import React from 'react';
import { Route, Switch, } from 'react-router-dom'
import routes from './routes/config';
import PrivateRoute from './routes/PrivateRoute';
import GuestRoute from './routes/GuestRoute';
import NoMatch from '../components/pages/NoMatch';
import HeaderMenu from './widgets/HeaderMenu';

const App = () => {
  const _mainRoutes = routes.map(({ path, component: C, exact, mode = 'none', ...rest }) => {
    switch (mode) {
      case 'private':
        return <PrivateRoute key={path} {...rest} exact={exact} path={path} component={C} />
      case 'guest':
        return <GuestRoute key={path} {...rest} exact={exact} path={path} component={C} />
      default:
        return <Route key={path} exact={exact} path={path} {...rest} render={props => <C {...rest} {...props}/>} />
    }
  })
  return (
    <div>
      <HeaderMenu />
      <Switch>
        {_mainRoutes}
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export default App
