import React, { useState, } from 'react';
import { Route, Switch, } from 'react-router-dom'
import routes from './routes/config';
import PrivateRoute from './routes/PrivateRoute';
import GuestRoute from './routes/GuestRoute';
import NoMatch from '../components/pages/NoMatch';
import HeaderMenu from './widgets/HeaderMenu';
import { AuthProvider, authContextDefaultValue } from './context/auth';

const MainApp = (props) => {
  // retrieve user data from server or client
  let _userData;
  if(__isBrowser__){
    _userData = window.__USER_DATA__ || authContextDefaultValue;
    delete window.__USER_DATA__;
  } else {
    _userData = props.staticContext.user;
  }
  // authentication state of user
  const [auth, setAuth] = useState(_userData);
  // main route include guest & private routes
  const _mainRoutes = routes.map(({ path, component: C, exact, mode = 'none', ...rest }) => {
    switch (mode) {
      case 'private':
        return <PrivateRoute isAthenticated={!!auth.email} key={path} {...rest} exact={exact} path={path} component={C} />
      case 'guest':
        return <GuestRoute isAthenticated={!!auth.email} key={path} {...rest} exact={exact} path={path} component={C} />
      default:
        return <Route key={path} exact={exact} path={path} {...rest} render={props => <C {...rest} {...props} />} />
    }
  });

  return (
    <div>
      <AuthProvider value={{ user: auth, setAuth, }}>
        <HeaderMenu />
        <Switch>
          {_mainRoutes}
          <Route component={NoMatch} />
        </Switch>
      </AuthProvider>
    </div>
  )
}
const App = (props) => (
  <Route {...props} component={MainApp} />
)
export default App;
