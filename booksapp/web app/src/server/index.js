import express from 'express';
import React from 'react';
import { renderToString, } from 'react-dom/server';
import { StaticRouter, matchPath, } from 'react-router-dom';
import Helmet from 'react-helmet'
import { jsxToHtml } from './utils/tools';
import App from '../shared/components/App';
import { configMiddlewares } from './middlewares';

let app = express();

configMiddlewares(express, app);

app.get('/*', (req, res) => {
  let _markup = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  );
  let _helmet = Helmet.renderStatic();
  res.send(jsxToHtml(_markup, _helmet));
});

app.listen(3000, () => {
  console.log('Follow http://localhost:3000');
});