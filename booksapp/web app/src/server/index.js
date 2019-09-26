import express from 'express';
import { matchPath, } from 'react-router-dom'
import { jsxToHtml } from './utils/tools';
import { configMiddlewares } from './middlewares';
import User from './controllers/User';
import routes from '../shared/components/routes/config';

let app = express();

configMiddlewares(express, app);

app.get('/*', (req, res) => {
  let _activeRoute = routes.find(route => matchPath(req.url, route)) || {};
  let _fetchInitialData = _activeRoute.fetchInitialData
    ? _activeRoute.fetchInitialData(req.url)
    : Promise.resolve();
  // and get initial data to render current page
  let user = new User();
  Promise.all([
    user.getUserData(req.cookies._auth),// retrieve user data depend on cookies sended
    _fetchInitialData,
  ])
    .then(([userData, initialData = []]) => {
      let _render = jsxToHtml(req.url, { user: userData, data: initialData }, { user: userData, data: initialData })

      if (typeof _render === 'string')
        res.send(_render);
      else
        res.redirect(_render.redirectTo)
    })
    .catch(() => res.send(jsxToHtml(req.url, { user: {}, data: [] }, { user: {}, data: [] })));
});

app.listen(3000, () => {
  console.log('Follow http://localhost:3000');
});