import express from 'express';
import { jsxToHtml } from './utils/tools';
import { configMiddlewares } from './middlewares';
import User from './controllers/User';

let app = express();

configMiddlewares(express, app);

app.get('/*', (req, res) => {
  // retrieve user data depend on cookies sended
  let user = new User();
  user.getUserData(req.cookies._auth)
    .then(userData => {
      let _render = jsxToHtml(req.url, { user: userData, }, { user: userData, })
      if(typeof _render === 'object')
        res.redirect(_render.redirectTo)
      else res.send(_render);
    })
    .catch(() => res.send(jsxToHtml(req.url, { user: {}, }, { user: {}, })));
});

app.listen(3000, () => {
  console.log('Follow http://localhost:3000');
});