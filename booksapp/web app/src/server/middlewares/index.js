import authRouter from "../routes/auth";
import { cookiesParser } from './cookies';
import compression from 'compression';
import helmet from 'helmet';

export const configMiddlewares = (express, app) => {

  // serve static routes from /public folder as /
  app.use(express.static('public'));

  // other moddlewares config and init
  app.use(helmet());
  app.use(compression())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // parse cookies
  app.use(cookiesParser);
  
  // routes as middlewares
  app.use(authRouter);

}