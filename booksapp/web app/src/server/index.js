import express from 'express';
import { matchPath, } from 'react-router-dom'
import { jsxToHtml } from './utils/tools';
import { configMiddlewares } from './middlewares';
import User from './controllers/User';
import routes from '../shared/components/routes/config';

let app = express();

configMiddlewares(express, app);

app.get('/*', (req, res) => {
  let _userToken = req.cookies._auth;
  let _activeRoute = routes.find(route => matchPath(req.url, route)) || {};
  let _fetchInitialData = _activeRoute.fetchInitialData
    ? _activeRoute.fetchInitialData(req.url, { headers: {Authorization: `JWT ${_userToken}`}})
    : Promise.resolve(null);
  // and get initial data to render current page
  let user = new User();
  Promise.all([
    user.getUserData(_userToken),// retrieve user data depend on cookies sended
    _fetchInitialData,
  ])
    .then(([userData, initialData]) => {
      let _render = jsxToHtml(req.url, { user: userData, data: initialData })

      if (typeof _render === 'string')
        res.send(_render);
      else
        res.redirect(_render.redirectTo)
    })
    .catch((e) => {
      let _render = jsxToHtml(req.url, { user: [], data: [] });

      if (typeof _render === 'string')
        res.send(_render);
      else
        res.redirect(_render.redirectTo)
    });
});

app.listen(3000, () => {
  console.log('Follow http://localhost:3000');
});