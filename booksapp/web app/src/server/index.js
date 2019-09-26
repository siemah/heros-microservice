import express from 'express';
import React from 'react';
import { renderToString, } from 'react-dom/server';
import { StaticRouter, matchPath, } from 'react-router-dom';
import Helmet from 'react-helmet'
import { jsxToHtml } from './utils/tools';
import App from '../shared/components/App';
import { configMiddlewares } from './middlewares';
import User from './controllers/User';

let app = express();

configMiddlewares(express, app);

app.get('/*', (req, res) => {
  let _markup = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  );
  let _helmet = Helmet.renderStatic();
  // retrieve user data depend on cookies sended
  let user = new User();
  user.getUserData(req.cookies._auth)
    .then(userData => res.send(jsxToHtml(_markup, _helmet, { user: userData, })))
    .catch(() => res.send(jsxToHtml(_markup, _helmet, { user: {}, })));
});

app.listen(3000, () => {
  console.log('Follow http://localhost:3000');
});