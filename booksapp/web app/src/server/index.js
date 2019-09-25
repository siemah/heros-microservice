import express from 'express';
import React from 'react';
import { renderToString, } from 'react-dom/server';
import App from '../shared/components/App';
import { StaticRouter, } from 'react-router-dom'

let app = express();

app.use(express.static('/public'));

app.get('/*', (req, res) => {
  let _markup = renderToString(
    <StaticRouter>
      <App />
    </StaticRouter>
  );
  res.send(_markup);
});

app.listen(3000, () => {
  console.log('Follow http://localhost:3000');
});