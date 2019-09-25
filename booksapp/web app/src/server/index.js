import express from 'express';
import React from 'react';
import { renderToString, } from 'react-dom/server';
import { StaticRouter, matchPath, } from 'react-router-dom';

import routes from '../shared/components/routes/config';
import { jsxToHtml } from './utils/tools';
import App from '../shared/components/App';

let app = express();

app.use(express.static('public'));

app.get('/*', (req, res) => {
  let _markup = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  );
  res.send(jsxToHtml(_markup));
});

app.listen(3000, () => {
  console.log('Follow http://localhost:3000');
});