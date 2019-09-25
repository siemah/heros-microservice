import React from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom'
import routes from './routes/config';
import PrivateRoute from './routes/PrivateRoute';
import GuestRoute from './routes/GuestRoute';

const App = () => {
  const _mainRoutes = routes.map(({ path, component: C, exact, mode = 'none', ...rest }) => {
    switch (mode) {
      case 'private':
        return <PrivateRoute key={path} {...rest} component={C} />
      case 'guest':
        return <GuestRoute key={path} {...rest} component={C} />
      default:
        return <Route key={path} exact={exact} path={path} {...rest} component={C} />
    }
  })
  return (
    <div>
      <Switch>
        {_mainRoutes}
      </Switch>
    </div>
  )
}

export default App
