import express from 'express';
import React from 'react'
import { renderToString, } from 'react-dom/server';
import App from '../shared/App'

let app = express();

app.use(express.static('/public'));

app.get('/*', (req, res) => {
  let _markup = renderToString(<App />);
  res.send(_markup)
});

app.listen(3000, () => {
  console.log('listening on port 3000')
})