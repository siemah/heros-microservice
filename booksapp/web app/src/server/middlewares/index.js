import authRouter from "../routes/auth";

export const configMiddlewares = (express, app) => {

  // serve static routes from /public folder as /
  app.use(express.static('public'));

  // other moddlewares config and init
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // routes as middlewares
  app.use(authRouter);

}